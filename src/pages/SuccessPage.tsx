import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription, AlertIcons } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { CheckCircle, PlayCircle, Copy, Check } from 'lucide-react'

const playlists = [
  {
    name: 'Lady Bug',
    url: 'https://www.youtube.com/playlist?list=PL1Z9718vXb3jwQ0dF90z7C8mxPvf34COI',
  },
  {
    name: 'Butterfly',
    url: 'https://www.youtube.com/playlist?list=PL1Z9718vXb3gjKyoek6imDxfuNLbM7Iw9',
  },
  {
    name: 'Dragonfly',
    url: 'https://www.youtube.com/playlist?list=PL1Z9718vXb3gExDD3LTeCbtZ-NPp4EPFJ',
  },
  {
    name: 'Humming Bird',
    url: 'https://www.youtube.com/playlist?list=PL1Z9718vXb3goDf-nX-ds4Ke3IQHS5rEW',
  },
]

export function SuccessPage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  const handleContinue = () => {
    window.location.href = '/'
  }

  const copyToClipboard = async (url: string, name: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(name)
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="success">
            <AlertIcons.success className="h-4 w-4" />
            <AlertDescription>
              Your payment has been processed successfully. Welcome to your yoga journey!
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your Course Content
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                You now have access to all course playlists. Click any link below to start learning.
              </p>
              <p className="text-green-700 text-sm font-medium bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                Please copy and save these links for future access to your courses!
              </p>
            </div>

            <div className="grid gap-3">
              {playlists.map((playlist) => (
                <div
                  key={playlist.name}
                  className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <PlayCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-left"
                  >
                    <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                      {playlist.name}
                    </h4>
                    <p className="text-xs text-gray-500 break-all">{playlist.url}</p>
                  </a>
                  <button
                    onClick={() => copyToClipboard(playlist.url, playlist.name)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                    title="Copy link"
                  >
                    {copiedLink === playlist.name ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-4">
                You can access these playlists anytime from the course outline on the main page.
              </p>
              <Button onClick={handleContinue} className="w-full">
                Return to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}