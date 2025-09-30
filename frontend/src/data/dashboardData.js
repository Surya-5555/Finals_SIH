export const statsData = [
    {
      title: "Active Projects",
      value: "8",
      change: "+4",
      changeType: "positive",
      period: "this month"
    },
    {
      title: "Carbon Credits",
      value: "1,247",
      change: "+15%",
      changeType: "positive",
      period: "this month"
    },
    {
      title: "Completed Forms",
      value: "24",
      change: "+4",
      changeType: "positive",
      period: "this month"
    },
    {
      title: "Revenue (USD)",
      value: "$45,230",
      change: "+12.5%",
      changeType: "positive",
      period: "this month"
    }
  ];
  
  export const projectsData = [
    {
      id: 1,
      title: "Sundarbans Mangrove Restoration",
      methodology: "VM0033 Methodology",
      location: "West Bengal, India",
      progress: 75,
      credits: 459,
      creditsChange: "+7%",
      status: "active"
    },
    {
      id: 2,
      title: "Gulf of Mannar Seagrass Conservation",
      methodology: "VM0007 Methodology",
      location: "Tamil Nadu, India",
      progress: 100,
      credits: 330,
      creditsChange: "+10%",
      status: "completed"
    }
  ];
  
  export const quickActions = [
    {
      title: "Start New Project",
      description: "Choose a methodology and begin",
      action: "/projects/new"
    },
    {
      title: "View Reports",
      description: "Check your project analysis",
      action: "/reports"
    },
    {
      title: "Schedule Meeting",
      description: "Plan your next project review",
      action: "/schedule"
    },
    {
      title: "Marketplace",
      description: "Trade your carbon credits",
      action: "/marketplace"
    }
  ];
  
  export const sidebarMenu = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "Methodologies", icon: "📚", path: "/methodologies" },
    { name: "MRV Engine", icon: "⚙️", path: "/mrv" },
    { name: "My Projects", icon: "🌿", path: "/projects" },
    { name: "Notifications", icon: "🔔", path: "/notifications" },
    { name: "Settings", icon: "⚙️", path: "/settings" }
  ];