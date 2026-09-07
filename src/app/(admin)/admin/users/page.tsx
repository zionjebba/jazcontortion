import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { RoleToggle } from "@/components/admin/RoleToggle";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { purchases: true }
      },
      purchases: {
        select: { amount: true }
      }
    }
  });

  return (
    <main className="min-h-screen p-6 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-[-0.04em]">Users</h1>
        <p className="mt-4 text-foreground/60 max-w-xl text-sm leading-relaxed">
          Manage registered users and view their purchase history. Grant or revoke admin privileges below.
        </p>
      </header>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-secondary/30 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-foreground/60 uppercase tracking-widest text-[10px] font-black">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Purchases</th>
              <th className="px-6 py-4">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {user.image ? (
                      <div className="relative size-10 overflow-hidden rounded-full border border-white/10">
                        <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                        {user.name?.[0] || user.email[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{user.name || "Unknown"}</div>
                      <div className="text-xs text-foreground/50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <RoleToggle userId={user.id} currentRole={user.role} />
                </td>
                <td className="px-6 py-6 text-foreground/50 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-foreground/70">
                  {user._count.purchases}
                </td>
                <td className="px-6 py-4 font-semibold text-green-400">
                  ₵{user.purchases.reduce((acc, purchase) => acc + purchase.amount, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
