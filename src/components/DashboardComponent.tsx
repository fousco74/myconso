
import Item from "./item";

export default function Dashboard({ children }: { children: React.ReactNode }) {

    const menus = [
       {
         icon: "index",
         name: "Index",
         url: "/admin/dashboard/index"
       },
       {
         icon: "searchs",
         name: "Recherche",
       },
       {
         icon: "stats",
         name: "Statistiques",
         url: "/admin/dashboard/statistiques"
   
       },
       {
         icon: "users",
         name: "Utilisateurs",
         url: "/admin/dashboard/users"
   
       },
       {
         icon: "invoices",
         name: "Factures",
         url: "/admin/dashboard/invoices"
   
       },
       {
         icon: "devices",
         name: "Appareils",
       },
       {
         icon: "notifs",
         name: "Notifications",
       },
     ];

  return (
    <div className="w-full h-screen flex py-8  gap-5 justify-around">
      <div className="px-6 rounded-lg   bg-white">
        <ul className="py-10 space-y-8 text-[10px]">
          {menus.map((item) => (
            <Item url={item.url} key={item.icon} name={item.name} icon={item.icon} />
          ))}
        </ul>
      </div>

      <div className="flex flex-col w-full">
         {children}
      </div>
    </div>
  );
}
