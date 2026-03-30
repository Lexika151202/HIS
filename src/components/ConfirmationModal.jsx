import React from 'react';
import { AlertCircle, Trash2, Save, X } from 'lucide-react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Xác nhận", 
  message = "Bạn có chắc chắn muốn thực hiện hành động này?", 
  confirmText = "Xác nhận", 
  cancelText = "Hủy",
  type = "info" // 'info', 'warning', 'danger', 'success'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return <Trash2 size={24} color="#ef4444" />;
      case 'warning': return <AlertCircle size={24} color="#f59e0b" />;
      case 'success': return <Save size={24} color="#10b981" />;
      default: return <AlertCircle size={24} color="#2563eb" />;
    }
  };

  const getConfirmColor = () => {
    switch (type) {
      case 'danger': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
      default: return '#2563eb';
    }
  };

  return (
    <div style={{ 
      position: 'fixed', inset: 0, zIndex: 10000, 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' 
    }}>
      <div className="animate-fade" style={{ 
        width: '400px', background: '#fff', borderRadius: '16px', 
        padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '12px',
            fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' 
          }}>
            <div style={{ 
              padding: '8px', 
              background: type === 'danger' ? '#fef2f2' : (type === 'warning' ? '#fffbeb' : '#eff6ff'), 
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {getIcon()}
            </div>
            {title}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>
        
        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '2rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onClose} 
            style={{ 
              flex: 1, padding: '0.75rem', borderRadius: '12px', 
              border: '1px solid #e2e8f0', background: '#fff', 
              fontWeight: 600, color: '#64748b', cursor: 'pointer' 
            }}
          >
            {cancelText}
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }} 
            style={{ 
              flex: 1, padding: '0.75rem', borderRadius: '12px', 
              border: 'none', background: getConfirmColor(), 
              fontWeight: 600, color: '#fff', cursor: 'pointer',
              boxShadow: `0 4px 12px ${getConfirmColor()}40`
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
