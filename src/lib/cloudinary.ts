// Cloudinary unsigned image upload. The browser uploads the file directly to
// Cloudinary using an *unsigned* upload preset, so no API secret ships to the
// client. Cloudinary responds with a hosted URL which we store as a post's
// `imageUrl` — exactly like a pasted URL, just produced by the upload.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/**
 * Upload an image file to Cloudinary and resolve with its hosted `secure_url`.
 * `onProgress` receives an integer percentage (0–100) while the upload runs.
 */
export function uploadImage(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    return Promise.reject(
      new Error('Cloudinary is not configured (VITE_CLOUDINARY_* env vars).'),
    )
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress?.(Math.round((e.loaded / e.total) * 100))
      }
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText) as { secure_url?: string }
          if (res.secure_url) resolve(res.secure_url)
          else reject(new Error('Cloudinary response had no secure_url.'))
        } catch {
          reject(new Error('Could not parse Cloudinary response.'))
        }
      } else {
        reject(new Error(`Cloudinary upload failed (HTTP ${xhr.status}).`))
      }
    }
    xhr.onerror = () => reject(new Error('Network error during upload.'))
    xhr.send(form)
  })
}
