// EmailModal.tsx - Add TypeScript interfaces
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';

interface EmailFormData {
  from: string;
  to: string;
  subject: string;
  message: string;
}

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emailData: EmailFormData) => Promise<void>;
  tour?: {
    title?: string;
  };
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSubmit, tour }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    from: '',
    to: '',
    subject: `Tour Details: ${tour?.title || ''}`,
    message: `Please find attached the details for ${tour?.title || 'the tour'}.`
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Send Tour Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="from" className="text-gray-700 font-medium">
              From Email
            </Label>
            <Input
              id="from"
              name="from"
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.from}
              onChange={handleChange}
              className="w-full"
            />
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="to" className="text-gray-700 font-medium">
            Enter your Email ID
            </Label>
            <Input
              id="to"
              name="to"
              type="email"
              required
              placeholder="recipient@example.com"
              value={formData.to}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-700 font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full"
            />
          </div> */}

          {/* <div className="space-y-2">
            <Label htmlFor="message" className="text-gray-700 font-medium">
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div> */}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                'Sent Email'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;