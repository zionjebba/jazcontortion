import { prisma } from "@/lib/prisma";
import { CreditCard, TrendingUp, Users } from "lucide-react";

export default async function SalesPage() {
  const [purchases, revenueAgg] = await Promise.all([
    prisma.purchase.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        program: { select: { title: true } },
      },
    }),
    prisma.purchase.aggregate({
      where: { status: "success" },
      _sum: { amount: true },
    }),
  ]);

  const totalRevenue = revenueAgg._sum.amount ?? 0;
  const successfulPurchases = purchases.filter(p => p.status === "success").length;

  return (
    <main className="min-h-screen p-6 lg:p-12">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            ADMIN
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-black uppercase tracking-[-0.04em]">
            Sales & Revenue
          </h1>

          <p className="mt-4 max-w-xl text-foreground/60 text-sm leading-relaxed">
            A detailed log of all transactions and revenue metrics.
          </p>
        </header>

        <section className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/30 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 text-primary">
                <TrendingUp className="size-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                  Total Revenue
                </p>
              </div>
              <p className="mt-6 text-5xl font-black tracking-[-0.04em] bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                ₵{totalRevenue}
              </p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/30 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 text-primary">
                <CreditCard className="size-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                  Total Sales
                </p>
              </div>
              <p className="mt-6 text-5xl font-black tracking-[-0.04em] bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                {successfulPurchases}
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-secondary/30 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 text-primary">
                <Users className="size-6" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                  Total Transactions
                </p>
              </div>
              <p className="mt-6 text-5xl font-black tracking-[-0.04em] bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                {purchases.length}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-black uppercase tracking-[-0.04em] mb-6">
            Transaction History
          </h2>
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-secondary/30 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-foreground/60 uppercase tracking-widest text-[10px] font-black">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Program</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-foreground/50">
                      No purchases yet.
                    </td>
                  </tr>
                ) : (
                  purchases.map((purchase) => (
                    <tr key={purchase.id} className="transition-colors hover:bg-white/5">
                      <td className="px-6 py-6 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                        {purchase.id.slice(-8)}
                      </td>
                      <td className="px-6 py-6">
                        <p className="font-bold">{purchase.user.name}</p>
                        <p className="text-xs text-foreground/50 mt-1">{purchase.user.email}</p>
                      </td>
                      <td className="px-6 py-6 font-medium text-foreground/80">{purchase.program.title}</td>
                      <td className="px-6 py-6 font-black text-green-400">₵{purchase.amount}</td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                          purchase.status === "success" 
                            ? "bg-green-500/20 text-green-400" 
                            : purchase.status === "failed"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-foreground/50 text-xs font-medium">
                        {new Date(purchase.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
