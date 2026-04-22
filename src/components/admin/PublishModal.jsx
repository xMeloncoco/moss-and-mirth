/**
 * PublishModal.jsx
 * Controlled modal for publishing a new content version/snapshot.
 * Props: { open: boolean, onClose: () => void }
 */
import React, { useState, useEffect } from 'react'
import { useAdminStore } from '../../store/adminStore'
import { useToast } from '../../store/toastStore'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function PublishModal({ open, onClose }) {
  const publishVersion = useAdminStore(s => s.publishVersion)
  const addToast = useToast()

  const [label, setLabel] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Reset state whenever the modal opens
  useEffect(() => {
    if (open) {
      setLabel('')
      setPublishing(false)
      setSuccess(false)
      setError(null)
    }
  }, [open])

  async function handlePublish() {
    if (!label.trim()) return
    setPublishing(true)
    setError(null)
    try {
      await publishVersion(label.trim())
      setSuccess(true)
      addToast('Version published successfully!', 'success')
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 2000)
    } catch (err) {
      setError(err.message ?? 'Publish failed. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !publishing && label.trim()) {
      handlePublish()
    }
  }

  return (
    <Modal open={open} onClose={success ? undefined : onClose} title="Publish New Version">
      {success ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="text-4xl">🌿</span>
          <p className="font-body text-cream text-sm leading-relaxed">
            Published! New games will use this version.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="font-body text-sage text-sm leading-relaxed">
            Snapshot the current draft and make it available to new game sessions.
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-cream text-sm" htmlFor="publish-label">
              Version label <span className="text-danger">*</span>
            </label>
            <input
              id="publish-label"
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. v1.2 – Summer update"
              disabled={publishing}
              className="
                w-full rounded-md px-3 py-2 font-body text-sm
                bg-white/10 border border-gold/25 text-cream
                placeholder:text-sage/60
                focus:outline-none focus:ring-2 focus:ring-gold/50
                disabled:opacity-50
              "
            />
          </div>

          {error && (
            <p className="font-body text-sm text-danger bg-danger/10 border border-danger/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="secondary" onClick={onClose} disabled={publishing}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePublish}
              disabled={publishing || !label.trim()}
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
