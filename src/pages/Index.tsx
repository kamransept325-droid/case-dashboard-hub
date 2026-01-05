import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { InfographicsModal } from "@/components/dashboard/InfographicsModal";
import { CasesModal } from "@/components/dashboard/CasesModal";
import { HearingsModal } from "@/components/dashboard/HearingsModal";
import { InterviewsModal } from "@/components/dashboard/InterviewsModal";
import { ApprovalsModal } from "@/components/dashboard/ApprovalsModal";
import { CaseManagementModal } from "@/components/dashboard/CaseManagementModal";
import { ReportsModal } from "@/components/dashboard/ReportsModal";
import { DashboardFilters, FilterValues } from "@/components/dashboard/DashboardFilters";
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
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [infographicsOpen, setInfographicsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);
  const [casesOpen, setCasesOpen] = useState(false);
  const [notUpdatedOpen, setNotUpdatedOpen] = useState(false);
  const [hearingsOpen, setHearingsOpen] = useState(false);
  const [interviewsOpen, setInterviewsOpen] = useState(false);
  const [approvalsOpen, setApprovalsOpen] = useState(false);
  const [caseManagementOpen, setCaseManagementOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  // Base data that changes based on filters
  const getFilteredData = () => {
    if (!activeFilters || (
      activeFilters.programs.length === 0 &&
      activeFilters.districts.length === 0 &&
      activeFilters.lawyers.length === 0 &&
      activeFilters.caseReferred.length === 0 &&
      activeFilters.caseTypes.length === 0
    )) {
      return {
        totalCases: 2977,
        totalApproved: 2650,
        totalFiled: 463,
        inFavour: 1851,
        againstLAS: 409,
        pendingInCourt: 448,
        pendingPercent: 16,
        disposedOf: 2323,
        disposedPercent: 84,
        favourPercent: 82,
        avgDays: 134,
        allCasesCount: 2977,
        notUpdatedCount: 45,
        upcomingHearings: 12,
        newInterviews: 8,
        pendingApprovals: 23,
      };
    }

    // Calculate multiplier based on selected filters
    const programMultiplier = activeFilters.programs.length > 0 
      ? activeFilters.programs.length / 8 
      : 1;
    const districtMultiplier = activeFilters.districts.length > 0 
      ? activeFilters.districts.length / 10 
      : 1;
    const combinedMultiplier = (programMultiplier + districtMultiplier) / 2;

    const totalCases = Math.round(2977 * combinedMultiplier);
    const totalApproved = Math.round(2650 * combinedMultiplier);
    const totalFiled = Math.round(463 * combinedMultiplier);
    const inFavour = Math.round(1851 * combinedMultiplier);
    const againstLAS = Math.round(409 * combinedMultiplier);
    const pendingInCourt = Math.round(448 * combinedMultiplier);
    const disposedOf = Math.round(2323 * combinedMultiplier);

    return {
      totalCases,
      totalApproved,
      totalFiled,
      inFavour,
      againstLAS,
      pendingInCourt,
      pendingPercent: totalCases > 0 ? Math.round((pendingInCourt / totalCases) * 100) : 0,
      disposedOf,
      disposedPercent: totalCases > 0 ? Math.round((disposedOf / totalCases) * 100) : 0,
      favourPercent: disposedOf > 0 ? Math.round((inFavour / disposedOf) * 100) : 0,
      avgDays: Math.round(134 * (0.8 + Math.random() * 0.4)),
      allCasesCount: totalCases,
      notUpdatedCount: Math.round(45 * combinedMultiplier),
      upcomingHearings: Math.round(12 * combinedMultiplier),
      newInterviews: Math.round(8 * combinedMultiplier),
      pendingApprovals: Math.round(23 * combinedMultiplier),
    };
  };

  const dashboardData = getFilteredData();

  const handleApplyFilters = (filters: FilterValues) => {
    setActiveFilters(filters);
    const programsText = filters.programs.length > 0 
      ? filters.programs.join(", ") 
      : "all programs";
    const districtsText = filters.districts.length > 0 
      ? filters.districts.join(", ") 
      : "";
    toast({
      title: "Filters Applied",
      description: `Showing results for ${programsText}${districtsText ? `, ${districtsText}` : ""}`,
    });
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
    toast({
      title: "Filters Cleared",
      description: "Showing all results",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, Bassam Dahri
            </h2>
            <p className="text-muted-foreground">
              Cumulative Dashboard Overview
            </p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Data
          </Button>
        </div>

        {/* Filters Panel */}
        <DashboardFilters
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Scorecards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <ScoreCard
            title="Total Cases"
            value={dashboardData.totalCases}
            icon={FileText}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <ScoreCard
            title="Total Approved"
            value={dashboardData.totalApproved}
            icon={CheckCircle}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <ScoreCard
            title="Total Filed Cases"
            value={dashboardData.totalFiled}
            icon={Scale}
            variant="default"
          />
          <ScoreCard
            title="In Favour of LAS"
            value={dashboardData.inFavour}
            icon={ThumbsUp}
            variant="success"
            trend={{ value: 5, isPositive: true }}
          />
          <ScoreCard
            title="Against LAS"
            value={dashboardData.againstLAS}
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
                    <span className="text-accent">{dashboardData.pendingPercent}%</span>
                    <span className="ml-2 text-muted-foreground">({dashboardData.pendingInCourt.toLocaleString()})</span>
                  </span>
                </div>
                <Progress value={dashboardData.pendingPercent} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Disposed of</span>
                  <span className="font-semibold">
                    <span className="text-success">{dashboardData.disposedPercent}%</span>
                    <span className="ml-2 text-muted-foreground">({dashboardData.disposedOf.toLocaleString()})</span>
                  </span>
                </div>
                <Progress value={dashboardData.disposedPercent} className="h-2" />
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
                    <span className="text-success">{dashboardData.favourPercent}%</span>
                    <span className="ml-2 text-muted-foreground">({dashboardData.inFavour.toLocaleString()})</span>
                  </span>
                </div>
                <Progress value={dashboardData.favourPercent} className="h-2" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Avg. Days to Resolution</span>
                <span className="text-2xl font-bold text-primary">
                  {dashboardData.avgDays} <span className="text-sm font-normal text-muted-foreground">Days</span>
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
              count={dashboardData.allCasesCount}
              variant="default"
              onClick={() => setCasesOpen(true)}
            />
            <QuickActionCard
              title="Cases Not Updated"
              description="Cases pending update (30+ days)"
              icon={AlertCircle}
              count={dashboardData.notUpdatedCount}
              variant="warning"
              onClick={() => setNotUpdatedOpen(true)}
            />
            <QuickActionCard
              title="Upcoming Hearings"
              description="Scheduled court appearances"
              icon={Calendar}
              count={dashboardData.upcomingHearings}
              variant="default"
              onClick={() => setHearingsOpen(true)}
            />
          </div>
        </div>

        {/* Additional Quick Links */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            title="New Interviews"
            description="Recent client interviews"
            icon={Users}
            count={dashboardData.newInterviews}
            variant="default"
            onClick={() => setInterviewsOpen(true)}
          />
          <QuickActionCard
            title="Pending Approvals"
            description="Cases awaiting approval"
            icon={FileCheck}
            count={dashboardData.pendingApprovals}
            variant="warning"
            onClick={() => setApprovalsOpen(true)}
          />
          <QuickActionCard
            title="Case Management"
            description="Manage all case records"
            icon={FolderOpen}
            variant="default"
            onClick={() => setCaseManagementOpen(true)}
          />
          <QuickActionCard
            title="Reports"
            description="Generate custom reports"
            icon={BarChart3}
            variant="default"
            onClick={() => setReportsOpen(true)}
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
      <HearingsModal open={hearingsOpen} onOpenChange={setHearingsOpen} />
      <InterviewsModal open={interviewsOpen} onOpenChange={setInterviewsOpen} />
      <ApprovalsModal open={approvalsOpen} onOpenChange={setApprovalsOpen} />
      <CaseManagementModal open={caseManagementOpen} onOpenChange={setCaseManagementOpen} />
      <ReportsModal open={reportsOpen} onOpenChange={setReportsOpen} />
    </div>
  );
};

export default Index;
