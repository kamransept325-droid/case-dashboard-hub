import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { InfographicsModal } from "@/components/dashboard/InfographicsModal";
import { CasesModal } from "@/components/dashboard/CasesModal";
import {
  FileText,
  CheckCircle,
  Scale,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  FolderOpen,
  AlertCircle,
  Calendar,
  Users,
  Download,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const [infographicsOpen, setInfographicsOpen] = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);
  const [notUpdatedOpen, setNotUpdatedOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, Irfan Nawaz
            </h2>
            <p className="text-muted-foreground">
              Human Rights Department Dashboard Overview
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Scorecards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <ScoreCard
            title="Total Cases"
            value={2977}
            icon={FileText}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <ScoreCard
            title="Total Approved"
            value={2650}
            icon={CheckCircle}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <ScoreCard
            title="Total Filed Cases"
            value={463}
            icon={Scale}
            variant="default"
          />
          <ScoreCard
            title="In Favour of LAS"
            value={1851}
            icon={ThumbsUp}
            variant="success"
            trend={{ value: 5, isPositive: true }}
          />
          <ScoreCard
            title="Against LAS"
            value={409}
            icon={ThumbsDown}
            variant="destructive"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* Quick Summary Cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Case Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pending in Court</span>
                  <span className="font-semibold">
                    <span className="text-accent">16%</span>
                    <span className="ml-2 text-muted-foreground">(448)</span>
                  </span>
                </div>
                <Progress value={16} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Disposed of</span>
                  <span className="font-semibold">
                    <span className="text-success">84%</span>
                    <span className="ml-2 text-muted-foreground">(2,323)</span>
                  </span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Disposal Outcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">In Favor of LAS</span>
                  <span className="font-semibold">
                    <span className="text-success">82%</span>
                    <span className="ml-2 text-muted-foreground">(1,851)</span>
                  </span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Avg. Days to Resolution</span>
                <span className="text-2xl font-bold text-primary">
                  134 <span className="text-sm font-normal text-muted-foreground">Days</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action Buttons */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickActionCard
              title="View Infographics"
              description="Analytics, charts & visual reports"
              icon={BarChart3}
              variant="primary"
              onClick={() => setInfographicsOpen(true)}
            />
            <QuickActionCard
              title="All Cases"
              description="View cases in list or grid view"
              icon={FolderOpen}
              count={2977}
              variant="default"
              onClick={() => setCasesOpen(true)}
            />
            <QuickActionCard
              title="Cases Not Updated"
              description="Cases pending update (30+ days)"
              icon={AlertCircle}
              count={45}
              variant="warning"
              onClick={() => setNotUpdatedOpen(true)}
            />
            <QuickActionCard
              title="Upcoming Hearings"
              description="Scheduled court appearances"
              icon={Calendar}
              count={12}
              variant="default"
            />
          </div>
        </div>

        {/* Additional Quick Links */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            title="New Interviews"
            description="Recent client interviews"
            icon={Users}
            count={8}
            variant="default"
          />
          <QuickActionCard
            title="Pending Approvals"
            description="Cases awaiting approval"
            icon={FileCheck}
            count={23}
            variant="warning"
          />
          <QuickActionCard
            title="Case Management"
            description="Manage all case records"
            icon={FolderOpen}
            variant="default"
          />
          <QuickActionCard
            title="Reports"
            description="Generate custom reports"
            icon={BarChart3}
            variant="default"
          />
        </div>
      </main>

      {/* Modals */}
      <InfographicsModal open={infographicsOpen} onOpenChange={setInfographicsOpen} />
      <CasesModal
        open={casesOpen}
        onOpenChange={setCasesOpen}
        title="All Cases"
        filterType="all"
      />
      <CasesModal
        open={notUpdatedOpen}
        onOpenChange={setNotUpdatedOpen}
        title="Cases Not Updated (30+ Days)"
        filterType="notUpdated"
      />
    </div>
  );
};

export default Index;
