import { User, Shield, Bell, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen p-6 lg:p-12">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            ADMIN
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-black uppercase tracking-[-0.04em]">
            Settings
          </h1>

          <p className="mt-4 max-w-xl text-foreground/60 text-sm leading-relaxed">
            Manage your admin profile and global platform configurations.
          </p>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_3fr]">
          
          {/* Settings Navigation / Sidebar inside the page */}
          <nav className="flex flex-col gap-2">
            <button className="group flex items-center gap-3 rounded-2xl bg-primary/10 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-primary shadow-[inset_0_0_20px_rgba(255,100,0,0.1)] transition-colors">
              <User className="size-4" />
              Profile
            </button>
            <button className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/50 transition-colors hover:bg-white/5 hover:text-foreground">
              <Key className="size-4 transition-transform group-hover:scale-110" />
              Security
            </button>
            <button className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/50 transition-colors hover:bg-white/5 hover:text-foreground">
              <Shield className="size-4 transition-transform group-hover:scale-110" />
              Platform
            </button>
            <button className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/50 transition-colors hover:bg-white/5 hover:text-foreground">
              <Bell className="size-4 transition-transform group-hover:scale-110" />
              Notifications
            </button>
          </nav>

          {/* Settings Form Content */}
          <div className="space-y-8">
            <section className="rounded-3xl border border-white/10 bg-secondary/30 p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-foreground">
                Admin Profile
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                Update your personal information and contact details.
              </p>

              <form className="mt-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="Maxwell Admin"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors hover:bg-black/60"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    defaultValue="admin@jazcontortion.com"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors hover:bg-black/60"
                  />
                </div>

                <button 
                  type="button"
                  className="rounded-full bg-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-lg transition-transform hover:-translate-y-1 hover:shadow-primary/25"
                >
                  Save Changes
                </button>
              </form>
            </section>

            <section className="rounded-3xl border border-white/10 bg-secondary/30 p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-foreground">
                Platform Toggles
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                Manage global state for the application.
              </p>

              <div className="mt-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">Allow New Signups</h3>
                    <p className="mt-1 text-xs text-foreground/50">Allow new users to register on the site.</p>
                  </div>
                  <div className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-primary shadow-[0_0_15px_rgba(255,100,0,0.4)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    <span className="translate-x-6 inline-block size-5 transform rounded-full bg-background transition-transform" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <div>
                    <h3 className="font-bold text-foreground">Maintenance Mode</h3>
                    <p className="mt-1 text-xs text-foreground/50">Disable all purchases and show a maintenance page.</p>
                  </div>
                  <div className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    <span className="translate-x-1 inline-block size-5 transform rounded-full bg-foreground/50 transition-transform" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
