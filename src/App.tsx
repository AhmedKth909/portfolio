import React, { useState, useCallback, useEffect } from 'react';

type AnimationType = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'bounce' | 'flip' | 'swing';
type BackdropType = 'dark' | 'light' | 'blur' | 'gradient' | 'none';
type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
type PositionType = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type DismissType = 'backdrop' | 'esc' | 'button' | 'all' | 'none';

interface ModalConfig {
  animation: AnimationType;
  backdrop: BackdropType;
  size: SizeType;
  position: PositionType;
  dismiss: DismissType;
}

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>({
    animation: 'scale',
    backdrop: 'dark',
    size: 'md',
    position: 'center',
    dismiss: 'all',
  });

  const openModal = useCallback((newConfig: Partial<ModalConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && (config.dismiss === 'all' || config.dismiss === 'backdrop')) {
      closeModal();
    }
  }, [config.dismiss, closeModal]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && (config.dismiss === 'all' || config.dismiss === 'esc')) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, config.dismiss, closeModal]);

  const getAnimationClasses = (): string => {
    const base = 'transition-all duration-300';
    const animations: Record<AnimationType, { open: string; closed: string }> = {
      'fade': { open: 'opacity-100', closed: 'opacity-0' },
      'scale': { open: 'opacity-100 scale-100', closed: 'opacity-0 scale-95' },
      'slide-up': { open: 'opacity-100 translate-y-0', closed: 'opacity-0 translate-y-8' },
      'slide-down': { open: 'opacity-100 translate-y-0', closed: 'opacity-0 -translate-y-8' },
      'slide-left': { open: 'opacity-100 translate-x-0', closed: 'opacity-0 translate-x-8' },
      'slide-right': { open: 'opacity-100 translate-x-0', closed: 'opacity-0 -translate-x-8' },
      'bounce': { open: 'opacity-100 scale-100', closed: 'opacity-0 scale-50' },
      'flip': { open: 'opacity-100 rotate-0', closed: 'opacity-0 rotate-12 scale-95' },
      'swing': { open: 'opacity-100 rotate-0', closed: 'opacity-0 -rotate-6 scale-95' },
    };
    return `${base} ${isOpen ? animations[config.animation].open : animations[config.animation].closed}`;
  };

  const getBackdropClasses = (): string => {
    const backdrops: Record<BackdropType, string> = {
      'dark': 'bg-black/60',
      'light': 'bg-white/40',
      'blur': 'bg-black/40 backdrop-blur-md',
      'gradient': 'bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30',
      'none': 'bg-transparent',
    };
    return backdrops[config.backdrop];
  };

  const getSizeClasses = (): string => {
    const sizes: Record<SizeType, string> = {
      'xs': 'w-72',
      'sm': 'w-96',
      'md': 'w-full max-w-lg',
      'lg': 'w-full max-w-2xl',
      'xl': 'w-full max-w-4xl',
      'fullscreen': 'w-full h-full m-0 rounded-none',
    };
    return sizes[config.size];
  };

  const getPositionClasses = (): string => {
    const positions: Record<PositionType, string> = {
      'center': 'items-center justify-center',
      'top': 'items-start justify-center pt-8',
      'bottom': 'items-end justify-center pb-8',
      'left': 'items-center justify-start pl-8',
      'right': 'items-center justify-end pr-8',
      'top-left': 'items-start justify-start p-8',
      'top-right': 'items-start justify-end p-8',
      'bottom-left': 'items-end justify-start p-8',
      'bottom-right': 'items-end justify-end p-8',
    };
    return positions[config.position];
  };

  const showcaseItems = [
    {
      title: 'Entry Animations',
      icon: '🎬',
      items: [
        { label: 'Fade', onClick: () => openModal({ animation: 'fade' }) },
        { label: 'Scale', onClick: () => openModal({ animation: 'scale' }) },
        { label: 'Slide Up', onClick: () => openModal({ animation: 'slide-up' }) },
        { label: 'Slide Down', onClick: () => openModal({ animation: 'slide-down' }) },
        { label: 'Slide Left', onClick: () => openModal({ animation: 'slide-left' }) },
        { label: 'Slide Right', onClick: () => openModal({ animation: 'slide-right' }) },
        { label: 'Bounce', onClick: () => openModal({ animation: 'bounce' }) },
        { label: 'Flip', onClick: () => openModal({ animation: 'flip' }) },
        { label: 'Swing', onClick: () => openModal({ animation: 'swing' }) },
      ],
    },
    {
      title: 'Backdrop Effects',
      icon: '🎨',
      items: [
        { label: 'Dark', onClick: () => openModal({ backdrop: 'dark' }) },
        { label: 'Light', onClick: () => openModal({ backdrop: 'light' }) },
        { label: 'Blur', onClick: () => openModal({ backdrop: 'blur' }) },
        { label: 'Gradient', onClick: () => openModal({ backdrop: 'gradient' }) },
        { label: 'None', onClick: () => openModal({ backdrop: 'none' }) },
      ],
    },
    {
      title: 'Sizes',
      icon: '📐',
      items: [
        { label: 'Extra Small', onClick: () => openModal({ size: 'xs' }) },
        { label: 'Small', onClick: () => openModal({ size: 'sm' }) },
        { label: 'Medium', onClick: () => openModal({ size: 'md' }) },
        { label: 'Large', onClick: () => openModal({ size: 'lg' }) },
        { label: 'Extra Large', onClick: () => openModal({ size: 'xl' }) },
        { label: 'Fullscreen', onClick: () => openModal({ size: 'fullscreen' }) },
      ],
    },
    {
      title: 'Positions',
      icon: '📍',
      items: [
        { label: 'Center', onClick: () => openModal({ position: 'center' }) },
        { label: 'Top', onClick: () => openModal({ position: 'top' }) },
        { label: 'Bottom', onClick: () => openModal({ position: 'bottom' }) },
        { label: 'Left', onClick: () => openModal({ position: 'left' }) },
        { label: 'Right', onClick: () => openModal({ position: 'right' }) },
        { label: 'Top Left', onClick: () => openModal({ position: 'top-left' }) },
        { label: 'Top Right', onClick: () => openModal({ position: 'top-right' }) },
        { label: 'Bottom Left', onClick: () => openModal({ position: 'bottom-left' }) },
        { label: 'Bottom Right', onClick: () => openModal({ position: 'bottom-right' }) },
      ],
    },
    {
      title: 'Dismissal Patterns',
      icon: '✖️',
      items: [
        { label: 'All Methods', onClick: () => openModal({ dismiss: 'all' }) },
        { label: 'Backdrop Only', onClick: () => openModal({ dismiss: 'backdrop' }) },
        { label: 'ESC Only', onClick: () => openModal({ dismiss: 'esc' }) },
        { label: 'Button Only', onClick: () => openModal({ dismiss: 'button' }) },
        { label: 'No Auto-dismiss', onClick: () => openModal({ dismiss: 'none' }) },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Modal Dialog Showcase
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore various modal configurations including different entry animations, 
            backdrop effects, sizes, positions, and dismissal patterns.
          </p>
        </div>

        <div className="grid gap-8">
          {showcaseItems.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Interactive Configurator
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Animation</label>
              <select
                value={config.animation}
                onChange={(e) => setConfig(prev => ({ ...prev, animation: e.target.value as AnimationType }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="fade">Fade</option>
                <option value="scale">Scale</option>
                <option value="slide-up">Slide Up</option>
                <option value="slide-down">Slide Down</option>
                <option value="slide-left">Slide Left</option>
                <option value="slide-right">Slide Right</option>
                <option value="bounce">Bounce</option>
                <option value="flip">Flip</option>
                <option value="swing">Swing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Backdrop</label>
              <select
                value={config.backdrop}
                onChange={(e) => setConfig(prev => ({ ...prev, backdrop: e.target.value as BackdropType }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="blur">Blur</option>
                <option value="gradient">Gradient</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Size</label>
              <select
                value={config.size}
                onChange={(e) => setConfig(prev => ({ ...prev, size: e.target.value as SizeType }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="xs">XS</option>
                <option value="sm">SM</option>
                <option value="md">MD</option>
                <option value="lg">LG</option>
                <option value="xl">XL</option>
                <option value="fullscreen">Fullscreen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Position</label>
              <select
                value={config.position}
                onChange={(e) => setConfig(prev => ({ ...prev, position: e.target.value as PositionType }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Dismiss</label>
              <select
                value={config.dismiss}
                onChange={(e) => setConfig(prev => ({ ...prev, dismiss: e.target.value as DismissType }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="backdrop">Backdrop</option>
                <option value="esc">ESC</option>
                <option value="button">Button</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            Open Custom Modal
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex ${getPositionClasses()} transition-opacity duration-200 ${getBackdropClasses()}`}
          onClick={handleBackdropClick}
          style={{ opacity: isOpen ? 1 : 0 }}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${getSizeClasses()} ${getAnimationClasses()}`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Modal Dialog</h3>
                  <p className="text-sm text-slate-500">Interactive modal showcase</p>
                </div>
              </div>
              {(config.dismiss === 'all' || config.dismiss === 'button') && (
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Animation</p>
                  <p className="text-sm font-semibold text-blue-800">{config.animation}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Backdrop</p>
                  <p className="text-sm font-semibold text-emerald-800">{config.backdrop}</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">Size</p>
                  <p className="text-sm font-semibold text-amber-800">{config.size}</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-rose-600 font-medium uppercase tracking-wide">Position</p>
                  <p className="text-sm font-semibold text-rose-800">{config.position}</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-violet-600 font-medium uppercase tracking-wide">Dismiss</p>
                  <p className="text-sm font-semibold text-violet-800">{config.dismiss}</p>
                </div>
              </div>

              <p className="text-slate-600 mb-4">
                This modal demonstrates the current configuration. Try changing the settings
                in the interactive configurator above to see different combinations.
              </p>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-800 mb-2">Dismissal Methods:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${config.dismiss === 'all' || config.dismiss === 'button' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    Close button: {(config.dismiss === 'all' || config.dismiss === 'button') ? 'Enabled' : 'Disabled'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${config.dismiss === 'all' || config.dismiss === 'backdrop' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    Backdrop click: {(config.dismiss === 'all' || config.dismiss === 'backdrop') ? 'Enabled' : 'Disabled'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${config.dismiss === 'all' || config.dismiss === 'esc' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    ESC key: {(config.dismiss === 'all' || config.dismiss === 'esc') ? 'Enabled' : 'Disabled'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;