import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import OrderSalesChart from "../../components/ecommerce/OrderSalesChart";
import StockMovement from "../../components/ecommerce/StockMovement";
import CategorySalesChart from "../../components/ecommerce/CategorySalesChart";
import { useSignalR } from "../../features/SignalR/signalRProvider";

export default function Home() {
  const data = useSignalR();
  return (
    <>
      <PageMeta
        title="İş Yönetim Paneli"
        description=""
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-12">
          <OrderSalesChart />
        </div>
       <div className="col-span-12 space-y-6 xl:col-span-6">
          <StockMovement data={data.stockMovements} />
        </div>
          <div className="col-span-12 space-y-6 xl:col-span-6">
          <CategorySalesChart data={data.categorySales} />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <RecentOrders data={data.topProducts ??[]} />
        </div>
        
      </div>

    </>
  );
}
