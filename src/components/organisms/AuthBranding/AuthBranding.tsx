import { Wallet } from "lucide-react";

export function AuthBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-between relative overflow-hidden">
      {/* blur background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold">FinanceFlow</h1>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-white text-5xl font-bold leading-tight">
            Take Control of<br />Your Finances
          </h2>
          <p className="text-blue-100 text-xl max-w-md">
            Modern, intuitive personal finance management that helps you achieve your financial goals.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-8 text-white/80">
          <div>
            <div className="text-3xl font-bold mb-1">10K+</div>
            <div className="text-sm">Active Users</div>
          </div>
          <div className="h-12 w-px bg-white/30"></div>
          <div>
            <div className="text-3xl font-bold mb-1">$2M+</div>
            <div className="text-sm">Managed</div>
          </div>
          <div className="h-12 w-px bg-white/30"></div>
          <div>
            <div className="text-3xl font-bold mb-1">4.9★</div>
            <div className="text-sm">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
