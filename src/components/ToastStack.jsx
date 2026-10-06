import React, { useEffect } from 'react';

export default function ToastStack({ toasts, removeToast }) {
  useEffect(() => {
    toasts.forEach(toast => {
      if (!toast.timerSet) {
        toast.timerSet = true;
        setTimeout(() => {
          removeToast(toast.id);
        }, 3400);
      }
    });
  }, [toasts, removeToast]);

  return (
    <div className="toast-stack" id="toastStack">
      {toasts.map(t => (
        <div key={t.id} className="toast show">
          <span className="t-icon">{t.icon}</span>
          <span>
            <span className="t-title">ACHIEVEMENT UNLOCKED — {t.title}</span>
            <span className="t-body">{t.body}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
