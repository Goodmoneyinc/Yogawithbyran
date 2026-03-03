import React, { useState } from 'react';
import { Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface VideoUploaderProps {
  moduleId: number;
  onUploadComplete?: () => void;
}

export function VideoUploader({ moduleId, onUploadComplete }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('mux-create-upload', {
        body: { corsOrigin: window.location.origin }
      });

      if (error) throw error;

      await fetch(data.upload_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      const { error: dbError } = await supabase.from('videos').insert({
        module_id: moduleId,
        mux_asset_id: data.asset_id,
        title: file.name.replace(/\.[^/.]+$/, ''),
        order_index: 0,
        published: false,
      });

      if (dbError) throw dbError;

      setUploadStatus('success');
      onUploadComplete?.();

      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-stone-400 transition-colors">
        <input
          type="file"
          id="video-upload"
          hidden
          accept="video/mp4,video/quicktime,video/x-m4v"
          onChange={handleUpload}
          disabled={uploading}
        />
        <label htmlFor="video-upload" className="cursor-pointer block">
          {uploading ? (
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-emerald-600" />
          ) : uploadStatus === 'success' ? (
            <CheckCircle className="h-10 w-10 mx-auto text-emerald-600" />
          ) : uploadStatus === 'error' ? (
            <AlertCircle className="h-10 w-10 mx-auto text-red-600" />
          ) : (
            <Upload className="h-10 w-10 mx-auto text-stone-400" />
          )}
          <p className="mt-2 text-stone-600 font-medium">
            {uploading
              ? 'Uploading securely to Mux...'
              : uploadStatus === 'success'
              ? 'Upload successful!'
              : uploadStatus === 'error'
              ? 'Upload failed'
              : 'Click to upload video'}
          </p>
          <p className="mt-1 text-sm text-stone-500">
            MP4, MOV, or M4V files supported
          </p>
        </label>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
