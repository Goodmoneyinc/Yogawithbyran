import React, { useState, useEffect } from 'react';
import { Upload, Film, Loader2, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminUploadManager() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [moduleName, setModuleName] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.from('courses').select('id, title').then(({ data }) => setCourses(data || []));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCourse) return alert("Select a course first!");

    setUploading(true);
    try {
      const { data } = await supabase.functions.invoke('mux-create-upload');

      await fetch(data.url, { method: 'PUT', body: file });

      await supabase.from('lessons').insert({
        title,
        course_id: selectedCourse,
        level,
        module_name: moduleName,
        mux_asset_id: data.asset_id
      });

      alert("Uploaded to " + level + " level in " + moduleName);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-stone-100">
      <h2 className="text-2xl font-heading mb-6 text-stone-800">Organize & Upload</h2>

      <div className="space-y-4">
        <select
          className="w-full p-3 rounded-lg border border-stone-200"
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Target Course...</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="p-3 rounded-lg border border-stone-200"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input
            placeholder="Module Name (e.g. Week 1)"
            className="p-3 rounded-lg border border-stone-200"
            onChange={(e) => setModuleName(e.target.value)}
          />
        </div>

        <input
          placeholder="Video Title"
          className="w-full p-3 rounded-lg border border-stone-200"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl cursor-pointer hover:bg-stone-50 transition">
          {uploading ? <Loader2 className="animate-spin text-sage-600" /> : <Upload className="text-stone-400" />}
          <span className="mt-2 text-stone-500 font-medium">
            {uploading ? "Securing Video..." : "Upload Lesson Content"}
          </span>
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}
