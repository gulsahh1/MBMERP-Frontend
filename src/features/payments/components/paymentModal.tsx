type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function PaymentModal({
  open,
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center 
                    bg-black/40 dark:bg-black/60 
                    backdrop-blur-sm p-6 pt-10">

      <div className="relative w-full max-w-md rounded-3xl 
                      bg-white dark:bg-gray-900 
                      text-gray-900 dark:text-gray-100
                      border border-gray-200 dark:border-gray-700
                      pt-14 px-6 pb-6 
                      shadow-2xl dark:shadow-black/50
                      animate-in fade-in zoom-in duration-200 max-h-[90vh]">

        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 
                     text-gray-500 dark:text-gray-300 
                     transition 
                     hover:bg-gray-100 dark:hover:bg-gray-800 
                     hover:text-gray-800 dark:hover:text-white"
          title="Kapat"
        >
          ✕
        </button>

        {children}

      </div>

    </div>
  );
}