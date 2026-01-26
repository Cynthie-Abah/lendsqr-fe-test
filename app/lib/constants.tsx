import { MessageSquare } from "lucide-react";
import { Icons } from "../components/ui/icons";


export const sidebarNav = [

  {
    type: 'link',
    label: 'Dashboard',
    path: '/',
    icon: Icons.dashboardIcon,
  },

  {
    type: 'section',
    title: 'CUSTOMERS',
    items: [
      { 
        label: 'Users', 
        path: '/customers/users',
        icon: Icons.usersIcon,
     },
      { 
        label: 'Guarantors', 
        path: '/customers/guarantors',
        icon: Icons.guarantorsIcon, },
      { 
        label: 'Loans', 
        path: '/customers/loans', 
        icon: Icons.loanIcon, },
      { 
        label: 'Decision Models', 
        path: '/customers/decision-models', 
        icon: Icons.decisionIcon,
    },
      { 
        label: 'Savings', 
        path: '/customers/savings',
        icon: Icons.savingsIcon, },
      { 
        label: 'Loan Requests', 
        path: '/customers/loan-requests',
        icon: Icons.loanRequest, },
      { 
        label: 'Whitelist', 
        path: '/customers/whitelist',
        icon: Icons.whiteListIcon, },
      { 
        label: 'Karma', 
        path: '/customers/karma', 
        icon: Icons.karmaIcon, },
    ],
  },

  {
    type: 'section',
    title: 'BUSINESSES',
    items: [
      { label: 'Organization', path: '/businesses/organization', icon: Icons.organizationIcon,},
      { label: 'Loan Products', path: '/businesses/loan-products', icon: Icons.loanRequest, },
      { label: 'Savings Products', path: '/businesses/savings-products', icon: Icons.saveProductIcon, },
      { label: 'Fees and Charges', path: '/businesses/fees-charges', icon: Icons.feesIcon, },
      { label: 'Transactions', path: '/businesses/transactions', icon: Icons.transactionIcon, },
      { label: 'Services', path: '/businesses/services', icon: Icons.services, },
      { label: 'Service Account', path: '/businesses/service-account', icon: Icons.serviceAccIcon, },
      { label: 'Settlements', path: '/businesses/settlements', icon: Icons.settlement, },
      { label: 'Reports', path: '/businesses/reports', icon: Icons.report, },
    ],
  },

  {
    type: 'section',
    title: 'SETTINGS',
    items: [
      { label: 'Preferences', path: '/settings/preferences', icon: Icons.preferenceIcon, },
      { label: 'Fees and Pricing', path: '/settings/fees-pricing', icon: Icons.pricingIcon, },
      { label: 'Audit Logs', path: '/settings/audit-logs', icon: Icons.auditIcon, },
      { label: 'Systems Messages', path: '/settings/system-messages', icon: MessageSquare, },
    ],
  },
] as const;

export const userStats = [
  {
    icon: <Icons.users2 />,
    name: 'Users',
    value: 2453,
    color: '#DF18FF',
  },
  {
    icon: <Icons.activeUsers />,
    name: 'Active Users',
    value: 2453,
    color: '#5718FF',
  },
  {
    icon: <Icons.loanUsers />,
    name: 'Users with Loans',
    value: 12453,
    color: '#F55F44',
  },
  {
    icon: <Icons.savingUserIcon />,
    name: 'Users with Savings',
    value: 102453,
    color: '#FF3366',
  },
];