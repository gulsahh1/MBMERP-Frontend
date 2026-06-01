import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">

      {/* SOL - FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          {children}
        </div>
      </div>

      {/* SAĞ - ANİMASYONLU PANEL */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-gray-900">

        {/* FLOATING BACKGROUND BLOBS */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float-slow top-10 left-10"></div>

          <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-float-medium bottom-10 right-10"></div>

          <div className="absolute w-52 h-52 bg-pink-500/20 rounded-full blur-2xl animate-float-fast top-1/2 left-1/3"></div>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-10 text-white animate-fade-in">

          <h1 className="text-3xl font-bold mb-3">
            İş Yönetim Paneli
          </h1>

          <p className="text-gray-300 text-sm mb-8">
            Tüm iş süreçlerini tek yerden kontrol et
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">

            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm hover:scale-105 transition">
              📊 Anlık Raporlar
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm hover:scale-105 transition">
              ⚡ Hızlı Veri Akışı
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm hover:scale-105 transition">
              🔐 Güvenli Giriş
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-sm hover:scale-105 transition">
              📦 Stok Takibi
            </div>

          </div>

          <div className="mt-10 text-xs text-gray-400 animate-pulse">
            ERP Sistemi • Modern İş Yönetimi
          </div>

        </div>
      </div>

      {/* THEME TOGGLER */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeTogglerTwo />
      </div>

    </div>
  );
}