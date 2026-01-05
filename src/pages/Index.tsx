import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { CaseSummaryCards } from "@/components/dashboard/CaseSummaryCards";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { CasesTable } from "@/components/dashboard/CasesTable";
import { FileCheck, Scale, ThumbsUp, ThumbsDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <ScrollArea className="flex-1">
          <main className="space-y-4 p-6">
            {/* KPI Stats Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Cases"
                value="463"
                icon={FileCheck}
                variant="primary"
              />
              <StatCard
                title="Approved Cases"
                value="442"
                icon={Scale}
                variant="success"
              />
              <StatCard
                title="In Favour of LAS"
                value="286"
                icon={ThumbsUp}
                variant="success"
              />
              <StatCard
                title="Against LAS"
                value="67"
                icon={ThumbsDown}
                variant="destructive"
              />
            </div>

            {/* Filters */}
            <FilterPanel />

            {/* Summary Cards */}
            <CaseSummaryCards />

            {/* Analytics Charts */}
            <AnalyticsCharts />

            {/* Cases Table */}
            <CasesTable />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
