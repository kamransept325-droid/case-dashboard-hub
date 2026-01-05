import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderOpen,
  FileText,
  CheckCircle,
  XCircle,
  ArrowRightLeft,
  History,
  Users,
  UserPlus,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const caseManagementOptions = [
  { title: "All Cases", icon: FileText, href: "/cases" },
  { title: "Cases for Approval", icon: FileText, href: "/approvals" },
  { title: "Approved Cases", icon: CheckCircle, href: "/cases?filter=approved" },
  { title: "Rejected Cases", icon: XCircle, href: "/cases?filter=rejected" },
];

const programTransferOptions = [
  { title: "Transfer Program", icon: ArrowRightLeft, href: "#" },
  { title: "Transfer History", icon: History, href: "#" },
];

const userManagementOptions = [
  { title: "View Users", icon: Users, href: "#" },
  { title: "Add User", icon: UserPlus, href: "#" },
];

const caseTransferOptions = [
  { title: "Case Transfer", icon: ArrowRightLeft, href: "#" },
  { title: "Case Transfer History", icon: History, href: "#" },
  { title: "Search Userwise", icon: Search, href: "#" },
];

export default function ManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="h-6 w-6 text-primary" />
              Program & User Management
            </h1>
            <p className="text-muted-foreground">Manage cases, programs, and users</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Cases Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {caseManagementOptions.map((option) => (
                <Link key={option.title} to={option.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <option.icon className="h-5 w-5 text-muted-foreground" />
                    {option.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Program Name Transfer Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Program Name Transfer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {programTransferOptions.map((option) => (
                <Link key={option.title} to={option.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <option.icon className="h-5 w-5 text-muted-foreground" />
                    {option.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* User Management Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {userManagementOptions.map((option) => (
                <Link key={option.title} to={option.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <option.icon className="h-5 w-5 text-muted-foreground" />
                    {option.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Case Transfer Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Case Transfer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {caseTransferOptions.map((option) => (
                <Link key={option.title} to={option.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <option.icon className="h-5 w-5 text-muted-foreground" />
                    {option.title}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
