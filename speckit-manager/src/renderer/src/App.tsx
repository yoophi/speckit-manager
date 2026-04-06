import type { JSX, ReactNode } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  ExternalLink,
  FileKey,
  FileSearch,
  FilePlus,
  FileText,
  Folder,
  FolderPlus,
  GitBranch,
  GitCompare,
  Info,
  Key,
  Keyboard,
  Link,
  Loader,
  Map,
  Palette,
  PencilLine,
  Play,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Split,
  SquareCheck,
  Terminal,
  Trash2,
  TriangleAlert,
  X
} from 'lucide-react'
import { useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Project = {
  name: string
  status: string
  statusColor: string
  updated: string
  files: string
  tags: string[]
}

type SpecFile = {
  name: string
  path: string
}

type SearchResult = {
  type: string
  file: string
  line: string
  label: string
  excerpt: string
  tone: string
}

type TaskItem = {
  title: string
  state: 'done' | 'in-progress' | 'todo'
}

type SettingSection = {
  title: string
  description: string
  content: ReactNode
}

const projects: Project[] = [
  {
    name: 'auth-service',
    status: 'Active',
    statusColor: 'bg-emerald-500',
    updated: 'Modified 2h ago',
    files: '12 files',
    tags: ['spec', 'plan', 'task']
  },
  {
    name: 'payment-api',
    status: 'Active',
    statusColor: 'bg-emerald-500',
    updated: 'Modified 1d ago',
    files: '8 files',
    tags: ['spec', 'plan']
  },
  {
    name: 'user-dashboard',
    status: 'Active',
    statusColor: 'bg-emerald-500',
    updated: 'Modified 4h ago',
    files: '15 files',
    tags: ['spec', 'plan', 'task']
  },
  {
    name: 'notification-system',
    status: 'Active',
    statusColor: 'bg-emerald-500',
    updated: 'Modified 6d ago',
    files: '6 files',
    tags: ['spec']
  },
  {
    name: 'data-pipeline',
    status: 'Archived',
    statusColor: 'bg-zinc-400',
    updated: 'Modified 2w ago',
    files: '10 files',
    tags: ['spec', 'plan', 'task']
  },
  {
    name: 'mobile-app',
    status: 'Active',
    statusColor: 'bg-emerald-500',
    updated: 'Modified 30m ago',
    files: '7 files',
    tags: ['spec', 'plan']
  }
]

const specFiles: SpecFile[] = [
  { name: 'spec.md', path: '/spec/viewer' },
  { name: 'plan.md', path: '/plan' },
  { name: 'tasks.md', path: '/tasks' },
  { name: 'quickstart.md', path: '/spec/viewer' }
]

const extraSpecFiles = [
  '001-auth-social-login',
  '002-audit-events',
  '003-user-rbac',
  '004-notification-system',
  '005-data-migration'
]

const searchResults: SearchResult[] = [
  {
    type: 'spec.md',
    file: 'API Endpoints',
    line: 'Line 42',
    label: 'API Endpoints',
    excerpt: 'Issue and validate JWT access/refresh token pairs with configurable expiration policies.',
    tone: 'blue'
  },
  {
    type: 'spec.md',
    file: 'Dependencies',
    line: 'Line 67',
    label: 'Dependencies',
    excerpt: 'Add token blacklist and JWT revocation cache layer for invalidated tokens.',
    tone: 'sky'
  },
  {
    type: 'plan.md',
    file: 'Phase 1',
    line: 'Line 19',
    label: 'Phase 1',
    excerpt: 'Implement JWT token generation with RS256 signing algorithm and key rotation support.',
    tone: 'violet'
  },
  {
    type: 'plan.md',
    file: 'Phase 2',
    line: 'Line 35',
    label: 'Phase 2',
    excerpt: 'Add JWT refresh endpoint with sliding window expiration and rotation mechanism.',
    tone: 'purple'
  },
  {
    type: 'tasks.md',
    file: 'In Progress',
    line: 'Line 8',
    label: 'In Progress',
    excerpt: 'Write unit tests for JWT token validation middleware and error handling.',
    tone: 'emerald'
  }
]

const taskGroups: Array<{ title: string; items: TaskItem[] }> = [
  {
    title: 'Setup & Configuration',
    items: [
      { title: 'Initialize project repository and CI pipeline', state: 'done' },
      { title: 'Configure Docker and docker-compose for local dev', state: 'done' },
      { title: 'Set up PostgreSQL schema migrations with Flyway', state: 'done' },
      { title: 'Configure Redis caching layer and connection pool', state: 'done' }
    ]
  },
  {
    title: 'Core Implementation',
    items: [
      { title: 'Implement user registration endpoint with validation', state: 'done' },
      { title: 'Build JWT token generation with RS256 signing', state: 'done' },
      { title: 'Create login endpoint with rate limiting middleware', state: 'todo' },
      { title: 'Implement refresh token rotation and revocation', state: 'todo' },
      { title: 'Add RBAC middleware with role hierarchy support', state: 'todo' }
    ]
  },
  {
    title: 'Testing & Documentation',
    items: [
      { title: 'Write unit tests for user registration flow', state: 'done' },
      { title: 'Write integration tests for JWT token lifecycle', state: 'todo' },
      { title: 'Document API endpoints in OpenAPI spec format', state: 'todo' }
    ]
  }
]

const settingsSections: SettingSection[] = [
  {
    title: '',
    description: '',
    content: (
      <div className="grid gap-4 xl:grid-cols-3">
        <AgentCard
          description="AI-powered coding agent with deep context understanding and multi-file editing capabilities."
          features={['Multi-file context awareness', 'Spec-driven workflow', 'Built-in tool use']}
          icon={<span className="font-mono text-lg font-bold text-emerald-400">&gt;</span>}
          iconBg="bg-[#1A1A1A]"
          selected
          subtitle="by Anthropic"
          title="Claude Code"
        />
        <AgentCard
          description="OpenAI coding agent with strong reasoning and code generation for complex tasks."
          features={['Sandboxed execution', 'Code reasoning', 'Multi-language support']}
          icon={<span className="font-mono text-sm font-bold text-white">CX</span>}
          iconBg="bg-black"
          subtitle="by OpenAI"
          title="Codex"
        />
        <AgentCard
          description="Open-source terminal coding agent with provider flexibility and local-first approach."
          features={['Provider agnostic', 'Local-first design', 'Fully customizable']}
          icon={<span className="font-mono text-sm font-bold text-violet-400">OC</span>}
          iconBg="bg-[#2D1B69]"
          subtitle="Open Source"
          title="OpenCode"
        />
      </div>
    )
  },
  {
    title: 'Agent Configuration',
    description: 'Choose which AI coding agent to use for spec generation and code execution.',
    content: (
      <div className="space-y-3">
        <SettingRow description="Path to the Claude Code CLI executable" label="Binary Path" value="~/.claude/bin/claude" />
        <SettingRow
          description="Default model to use for spec generation"
          dropdown
          label="Model"
          value="claude-sonnet-4-6"
        />
        <SettingRow
          description="Automatically run the agent when spec files are saved"
          label="Auto-run on save"
          trailing={
            <div className="relative flex h-6 w-11 items-center rounded-full bg-sky-500">
              <div className="absolute right-[2px] h-5 w-5 rounded-full bg-white" />
            </div>
          }
          value=""
        />
        <SettingRow description="Font size for the integrated terminal" label="Terminal Font Size" value="13px" />
      </div>
    )
  }
]

const allPages = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/dashboard/empty', label: 'Dashboard (Empty)' },
  { path: '/spec/viewer', label: 'Spec Viewer' },
  { path: '/search', label: 'Search Results' },
  { path: '/search/empty', label: 'Search (Empty)' },
  { path: '/editor/split', label: 'Split Editor' },
  { path: '/tasks', label: 'Task Viewer' },
  { path: '/project/empty', label: 'No Specs' },
  { path: '/editor/terminal', label: 'Editor + Terminal' },
  { path: '/settings', label: 'Settings' },
  { path: '/constitution', label: 'Constitution' },
  { path: '/plan', label: 'Plan Viewer' },
  { path: '/research', label: 'Research Notes' },
  { path: '/quickstart', label: 'Quick Start' },
  { path: '/dialog/add-project', label: 'Add Project Dialog' },
  { path: '/dialog/delete-project', label: 'Delete Project Dialog' }
]

function FloatingNav(): JSX.Element {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-2 w-56 rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-2xl backdrop-blur-sm">
          <div className="mb-1.5 px-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Pages
          </div>
          {allPages.map((page) => (
            <NavLink
              className={cn(
                'block rounded-lg px-3 py-1.5 text-xs text-zinc-600 transition hover:bg-zinc-100',
                location.pathname === page.path && 'bg-sky-50 font-medium text-sky-600'
              )}
              key={page.path}
              onClick={() => setOpen(false)}
              to={page.path}
            >
              {page.label}
            </NavLink>
          ))}
        </div>
      )}
      <button
        className={cn(
          'grid h-12 w-12 place-items-center rounded-full shadow-lg transition-all',
          open ? 'bg-zinc-950 text-white' : 'bg-sky-500 text-white hover:bg-sky-600'
        )}
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Map className="h-5 w-5" />}
      </button>
    </div>
  )
}

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route element={<Navigate replace to="/dashboard" />} path="/" />
        <Route element={<DashboardProjectsPage />} path="/dashboard" />
        <Route element={<DashboardEmptyPage />} path="/dashboard/empty" />
        <Route element={<SpecViewerPage />} path="/spec/viewer" />
        <Route element={<SearchResultsPage />} path="/search" />
        <Route element={<SearchEmptyPage />} path="/search/empty" />
        <Route element={<SplitEditorPage />} path="/editor/split" />
        <Route element={<TaskViewerPage />} path="/tasks" />
        <Route element={<ProjectNoSpecsPage />} path="/project/empty" />
        <Route element={<EditorTerminalPage />} path="/editor/terminal" />
        <Route element={<SettingsPage />} path="/settings" />
        <Route element={<ConstitutionPage />} path="/constitution" />
        <Route element={<PlanViewerPage />} path="/plan" />
        <Route element={<ResearchViewerPage />} path="/research" />
        <Route element={<QuickstartViewerPage />} path="/quickstart" />
        <Route element={<AddProjectDialogPage />} path="/dialog/add-project" />
        <Route element={<DeleteProjectDialogPage />} path="/dialog/delete-project" />
        <Route element={<Navigate replace to="/dashboard" />} path="*" />
      </Routes>
      <FloatingNav />
    </>
  )
}

function AppFrame({
  sidebar,
  content,
  rightPanel
}: {
  sidebar?: ReactNode
  content: ReactNode
  rightPanel?: ReactNode
}): JSX.Element {
  return (
    <div className="flex min-h-screen w-full bg-white text-zinc-950">
      {sidebar}
      <main className="min-w-0 flex-1">{content}</main>
      {rightPanel}
    </div>
  )
}

function TopDashboardBar(): JSX.Element {
  return (
    <header className="flex h-14 items-center gap-6 border-b border-zinc-200 bg-white px-8 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="text-sm font-semibold text-zinc-950">Speckit Manager</div>
      <div className="flex-1" />
      <div className="flex h-9 w-full max-w-md items-center gap-2 rounded-full bg-zinc-100 px-4 text-[13px] text-zinc-500">
        <Search className="h-3.5 w-3.5" />
        <span>Search in spec files...</span>
        <span className="ml-auto rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          ⌘K
        </span>
      </div>
      <div className="flex-1" />
      <button className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-100 text-zinc-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]">
        <Settings className="h-4 w-4" />
      </button>
    </header>
  )
}

function DashboardProjectsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <TopDashboardBar />
      <section className="space-y-6 px-10 py-8">
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-950">Projects</h1>
            <p className="text-sm text-zinc-500">Manage your spec-driven development projects</p>
          </div>
          <div className="flex h-7 items-center rounded-full bg-[#f7f8fa] px-3 font-mono text-xs text-zinc-400">
            6 projects
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
          <NewProjectCard />
        </div>
      </section>
    </div>
  )
}

function DashboardEmptyPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <TopDashboardBar />
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-zinc-100 text-zinc-400">
            <Folder className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">No projects yet</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Add a project directory containing spec files to get started.
            <br />
            Speckit Manager watches for <code>.spec.md</code>, <code>plan.md</code>,
            <code> task.md</code> and other markdown files generated by spec-driven development
            tools.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Button className="h-9 rounded-full bg-sky-500 px-5 text-xs font-semibold hover:bg-sky-600">
              <Plus className="mr-1 h-4 w-4" />
              Add Project
            </Button>
            <Button className="h-9 rounded-full px-5 text-xs font-semibold" variant="outline">
              Open Folder
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SharedSidebar({ compact }: { compact?: boolean }): JSX.Element {
  const location = useLocation()
  const showAllSpecs = !compact

  return (
    <aside className="flex h-screen w-[260px] flex-col border-r border-zinc-200 bg-[#f7f8fa]">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-5 py-4">
        <FileText className="h-5 w-5 text-sky-500" />
        <span className="text-sm font-semibold">Speckit</span>
      </div>
      <div className="px-5 pb-2 pt-3">
        <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-zinc-900">
          <Folder className="h-4 w-4 text-sky-500" />
          auth-service
        </div>
        <div className="space-y-1">
          <SidebarSpecLink icon={<BookOpen className="h-4 w-4 text-amber-500" />} path="/constitution">
            constitution.md
          </SidebarSpecLink>
          <div className="rounded-lg bg-sky-50 px-2 py-1">
            <div className="mb-1 flex items-center gap-1 text-[11px] font-medium text-sky-700">
              <ChevronDown className="h-3 w-3" />
              001-setup-base-architecture
            </div>
            <div className="space-y-1 pl-4">
              {specFiles.map((file) => (
                <SidebarSpecLink
                  active={
                    location.pathname === file.path &&
                    (file.name !== 'quickstart.md' || location.pathname === '/spec/viewer')
                  }
                  icon={<FileText className="h-3.5 w-3.5" />}
                  key={file.name}
                  path={file.path}
                >
                  {file.name}
                </SidebarSpecLink>
              ))}
            </div>
          </div>
          {showAllSpecs &&
            extraSpecFiles.map((file) => (
              <div className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-zinc-500" key={file}>
                <ChevronRight className="h-3 w-3" />
                {file}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-auto border-t border-zinc-200 p-2">
        <NavLink
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 transition hover:bg-white',
              isActive && 'bg-white text-zinc-950 shadow-sm'
            )
          }
          to="/dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
          All Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              'mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 transition hover:bg-white',
              isActive && 'bg-white text-zinc-950 shadow-sm'
            )
          }
          to="/settings"
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
      </div>
    </aside>
  )
}

function SpecViewerPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar
            pills={
              <>
                <Pill tone="green">Up to date</Pill>
                <button className="grid h-7 w-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100">
                  <PencilLine className="h-4 w-4" />
                </button>
                <button className="grid h-7 w-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100">
                  <Split className="h-4 w-4" />
                </button>
              </>
            }
            titleTrail="auth-service / 001-setup-base-architecture / spec.md"
          />
          <div className="flex min-h-0 flex-1">
            <article className="min-w-0 flex-1 overflow-auto px-16 pb-12 pt-8">
              <MarkdownArticle />
            </article>
          </div>
        </div>
      }
      rightPanel={
        <aside className="hidden h-screen w-[240px] shrink-0 border-l border-zinc-200 bg-white p-4 xl:block">
          <InfoRail />
        </aside>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function SearchResultsPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <div className="space-y-4 border-b border-zinc-200 px-8 pb-4 pt-6">
            <SearchField query="JWT token" />
            <div className="text-[13px] text-zinc-400">8 results found across 3 files</div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-xs text-zinc-400">Filter:</span>
              <FilterChip active>All</FilterChip>
              <FilterChip>spec.md</FilterChip>
              <FilterChip>plan.md</FilterChip>
              <FilterChip>task.md</FilterChip>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-8 py-2">
            <div className="space-y-1">
              {searchResults.map((result) => (
                <SearchResultCard key={`${result.type}-${result.line}`} result={result} />
              ))}
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function SearchEmptyPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <div className="space-y-4 border-b border-zinc-200 px-8 pb-4 pt-6">
            <SearchField query="WebSocket authentication" />
            <div className="text-[13px] text-zinc-400">0 results found</div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-8">
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-zinc-100">
                <Search className="h-7 w-7 text-zinc-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-zinc-950">No results found</h2>
                <p className="max-w-[400px] text-[13px] leading-relaxed text-zinc-400">
                  No matches for &quot;WebSocket authentication&quot; in any spec files.
                  <br />
                  Try a different search term or check your filters.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-1.5 rounded-xl bg-zinc-50 px-6 py-4 text-left text-[13px]">
                <div className="font-semibold text-zinc-950">Search tips</div>
                <div className="leading-relaxed text-zinc-400">• Use specific keywords like function names or error codes</div>
                <div className="leading-relaxed text-zinc-400">• Try searching with fewer terms for broader results</div>
                <div className="leading-relaxed text-zinc-400">• Check that your filters aren&apos;t excluding relevant files</div>
              </div>
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function SplitEditorPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar
            pills={
              <>
                <button className="rounded-md border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-500">
                  Split
                </button>
                <Pill tone="amber">Unsaved</Pill>
                <Button className="h-7 rounded-md bg-sky-500 px-3 text-xs hover:bg-sky-600">
                  Save
                </Button>
              </>
            }
            titleTrail="auth-service / spec.md"
          />
          <div className="grid min-h-0 flex-1 grid-cols-2 divide-x divide-zinc-200">
            <section className="overflow-auto px-10 py-8">
              <pre className="font-mono text-[13px] leading-7 text-zinc-600">
                {`# Authentication Service Specification

+ "Author": @yoophi
+ "Updated": 2026-04-06
+ "Version": v2.1.0

## Overview

The Authentication Service provides secure user
authentication and authorization for all microservices
in the platform. It supports OAuth 2.0, JWT token management,
and role-based access control.

## Requirements

### Functional Requirements

- Support email/password and social login (Google, GitHub)
- Issue and validate JWT access/refresh token pairs
- Implement role-based access control with admin, user, and viewer roles
- Enforce rate limiting on login endpoints (max 5 attempts/min)`}
              </pre>
            </section>
            <section className="overflow-auto px-10 py-8">
              <MarkdownArticle />
            </section>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function TaskViewerPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar
            pills={<Pill tone="green">7/12 done</Pill>}
            titleTrail="auth-service / 001-setup-base-architecture / tasks.md"
          />
          <div className="border-b border-zinc-200 px-12 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-[22px] font-bold tracking-tight text-zinc-950">Task Progress</h1>
              <span className="font-mono text-[22px] font-bold text-sky-500">58%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-zinc-100">
              <div className="h-2 w-[58%] rounded-full bg-sky-500" />
            </div>
            <div className="mt-3 flex gap-6 text-xs">
              <div>
                <span className="font-bold text-zinc-700">7</span>
                <span className="ml-1 text-zinc-400">Done</span>
              </div>
              <div>
                <span className="font-bold text-zinc-700">5</span>
                <span className="ml-1 text-zinc-400">Todo</span>
              </div>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto px-12 py-5">
            <div className="space-y-6">
              {taskGroups.map((group) => (
                <section key={group.title}>
                  <h2 className="mb-2 text-base font-semibold text-zinc-950">
                    {group.title}
                  </h2>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <TaskRow item={item} key={item.title} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function ProjectNoSpecsPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar titleTrail="auth-service" />
          <div className="grid min-h-0 flex-1 place-items-center px-10">
            <div className="max-w-lg text-center">
              <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-zinc-100 text-zinc-400">
                <FilePlus className="h-9 w-9" />
              </div>
              <h1 className="text-[22px] font-semibold tracking-tight text-zinc-950">No specs yet</h1>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                This project doesn&apos;t have any spec files yet.
                <br />
                Run speckit to generate your first spec.
              </p>
              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 font-mono text-[13px] text-white">
                <Terminal className="h-3.5 w-3.5" />
                speckit init
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <Button className="rounded-full bg-sky-500 px-5 hover:bg-sky-600">
                  <Terminal className="mr-1 h-3.5 w-3.5" />
                  Open Terminal
                </Button>
                <Button className="rounded-full px-5" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar compact />}
    />
  )
}

function EditorTerminalPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          {/* Top Toolbar */}
          <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-2">
            <div className="flex items-center gap-1.5 text-[13px] text-zinc-400">
              <span>auth-service</span>
              <span>/</span>
              <span>001-setup-base-architecture</span>
              <span>/</span>
              <span className="font-semibold text-zinc-950">spec.md</span>
            </div>
            <div className="flex-1" />
            <button className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500">
              <Terminal className="h-3.5 w-3.5" />
              Terminal
            </button>
            <button className="rounded-lg bg-sky-500 px-3 py-1 text-xs font-medium text-white">
              Save
            </button>
          </div>
          {/* Command Bar */}
          <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-1.5">
            <span className="text-[11px] font-semibold text-zinc-400">Speckit</span>
            <div className="h-4 w-px bg-zinc-200" />
            <CommandBarBtn color="text-amber-600" icon={<Shield className="h-3.5 w-3.5" />} label="constitution" />
            <CommandBarBtn color="text-sky-500" icon={<FileText className="h-3.5 w-3.5" />} label="specify" />
            <CommandBarBtn color="text-sky-500" icon={<Map className="h-3.5 w-3.5" />} label="plan" />
            <CommandBarBtn color="text-emerald-600" icon={<SquareCheck className="h-3.5 w-3.5" />} label="tasks" />
            <CommandBarBtn color="text-violet-500" icon={<BookOpen className="h-3.5 w-3.5" />} label="research" />
            <div className="flex-1" />
            <button className="flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
              <Play className="h-3 w-3" />
              Run
            </button>
          </div>
          {/* Editor Tab Bar + Split */}
          <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-500">
            <span className="font-medium text-zinc-700">spec.md</span>
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">
              AI mode
            </span>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] divide-x divide-zinc-200">
            <section className="overflow-auto px-7 py-6">
              <MarkdownArticle condensed />
            </section>
            <section className="flex min-h-0 flex-col bg-[#0A0A0A] text-zinc-100">
              <div className="flex items-center justify-between bg-[#141414] px-3 py-2 text-xs text-zinc-400">
                <span>claude-code</span>
                <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-500">Speckit Agent Mode</span>
                <button className="rounded text-zinc-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 overflow-auto px-4 py-4 font-mono text-xs leading-6">
                <div className="text-emerald-400">$ speckit specify</div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-400">
                  <div className="text-zinc-300">| Claude Code • Speckit Agent Mode |</div>
                  <div className="mt-3">Analyzing project structure...</div>
                  <div>Reading constitution.md</div>
                  <div>Found 3 existing specs</div>
                </div>
                <div className="text-emerald-400">
                  ✓ Generated spec.md for 001-setup-base-architecture
                </div>
                <div className="pl-4 text-zinc-500">
                  <div>• API endpoints: defined</div>
                  <div>• Auth middleware: added</div>
                  <div>• 3 dependencies listed</div>
                </div>
                <div className="text-yellow-400">Generating plan.md...</div>
                <div className="h-2 w-40 animate-pulse rounded-full bg-zinc-800" />
              </div>
            </section>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function CommandBarBtn({ icon, label, color }: { icon: ReactNode; label: string; color: string }): JSX.Element {
  return (
    <button className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-500">
      <span className={color}>{icon}</span>
      {label}
    </button>
  )
}

function SettingsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex h-14 items-center gap-4 border-b border-zinc-200 bg-white px-8 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
        <div className="text-sm font-semibold text-zinc-950">Speckit Manager</div>
        <div className="ml-auto">
          <NavLink
            className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3.5 py-1.5 text-[13px] text-zinc-500"
            to="/dashboard"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </NavLink>
        </div>
      </header>
      <div className="grid min-h-[calc(100vh-56px)] grid-cols-[240px_1px_1fr]">
        <aside className="bg-[#f7f8fa] px-2 py-4">
          <SettingsNav />
        </aside>
        <div className="bg-zinc-200" />
        <section className="overflow-auto px-12 py-8">
          <div className="max-w-6xl">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Coding Agent</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Choose which AI coding agent to use for spec generation and code execution.
            </p>
            <div className="mt-8 space-y-8">
              {settingsSections.map((section, i) => (
                <div key={i}>
                  {section.title && (
                    <>
                      {i > 0 && <div className="mb-5 h-px bg-zinc-200" />}
                      <h2 className="text-lg font-semibold text-zinc-950">{section.title}</h2>
                      <p className="mt-1 text-sm text-zinc-500">{section.description}</p>
                    </>
                  )}
                  <div className="mt-5">{section.content}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ConstitutionPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar
            pills={<Pill tone="amber">Project Constitution</Pill>}
            titleTrail="auth-service / constitution.md"
          />
          <div className="flex min-h-0 flex-1">
            <article className="min-w-0 flex-1 overflow-auto px-12 py-8">
              <h1 className="text-[28px] font-bold tracking-tight text-zinc-950">
                Project Constitution
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                The foundational document that guides all spec-driven development decisions for
                auth-service.
              </p>
              <div className="mt-5 h-px bg-zinc-200" />

              <Section title="Project Overview">
                auth-service is a microservice responsible for user authentication and authorization
                across the platform. It serves as the security backbone, handling identity
                management for all dependent services.
              </Section>

              <Section title="Tech Stack">
                <div className="grid gap-3 md:grid-cols-4">
                  <TechCard label="Language" value="TypeScript 5.x" />
                  <TechCard label="Framework" value="NestJS" />
                  <TechCard label="Database" value="PostgreSQL 16" />
                  <TechCard label="Cache" value="Redis 7.x" />
                </div>
              </Section>

              <Section title="Guiding Principles">
                <PrincipleCard
                  body="Security first. Decisions must prioritize security. No shortcuts on authentication, token management, or data protection."
                  index="1"
                  title="Security First"
                />
                <PrincipleCard
                  body="Follow OAuth 2.0 and OpenID Connect specifications strictly. No custom auth flows."
                  index="2"
                  title="Standards Compliance"
                />
                <PrincipleCard
                  body="100% test coverage on auth flows. Integration tests required for all endpoints before merge."
                  index="3"
                  title="Test Everything"
                />
              </Section>
            </article>
            <aside className="hidden w-[240px] shrink-0 border-l border-zinc-200 p-4 xl:block">
              <div className="space-y-5 text-xs">
                <div>
                  <div className="mb-2.5 font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    On This Page
                  </div>
                  <div className="space-y-2 text-zinc-500">
                    <div className="font-medium text-sky-600">Project Overview</div>
                    <div>Tech Stack</div>
                    <div>Guiding Principles</div>
                    <div>Coding Conventions</div>
                    <div>Dependencies Policy</div>
                  </div>
                </div>
                <div className="h-px bg-zinc-200" />
                <div>
                  <div className="mb-2.5 font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    Document Info
                  </div>
                  <KeyValue label="Last modified" value="3d ago" />
                  <KeyValue label="Created" value="2026-02-15" />
                  <KeyValue label="Spec links" value="4 specs" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function PlanViewerPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar pills={<Pill tone="blue">Phase 2 of 4</Pill>} titleTrail="auth-service / 001-setup-base-architecture / plan.md" />
          <div className="min-h-0 flex-1 overflow-auto px-10 py-8">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-950">
              Implementation Plan
            </h1>
            <p className="mt-3 text-sm text-zinc-500">
              Phased rollout for setting up base architecture, authentication, and deployment.
            </p>

            <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-400">
              Phase Timeline
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-4">
              <PhaseCard
                badge="Completed"
                days="~2 days · Completed"
                description="Repository scaffolding, CI/CD pipeline, and dev environment configuration."
                phase={1}
                title="Project Setup"
              />
              <PhaseCard
                active
                badge="CURRENT"
                days="~3 days · In Progress"
                description="JWT token service, session management, and user credential storage."
                phase={2}
                title="Core Authentication"
              />
              <PhaseCard
                badge="Upcoming"
                days="~4 days · Upcoming"
                description="REST endpoints, middleware API guards, and third-party OAuth providers."
                phase={3}
                title="API Integration"
              />
              <PhaseCard
                badge="Upcoming"
                days="~3 days · Upcoming"
                description="Unit tests, integration tests, staging environment, and production deploy."
                phase={4}
                title="Testing & Deploy"
              />
            </div>

            <div className="my-7 h-px bg-zinc-200" />

            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
              <h2 className="text-xl font-semibold text-zinc-950">
                Phase 2 — Core Authentication
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Implement the core authentication layer including JWT token generation, session
              persistence, password hashing, and user credential CRUD operations.
            </p>

            <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-400">
              Tasks
            </div>

            <div className="mt-3 space-y-1.5">
              <PlanTaskRow done title="Set up JWT token generation service" />
              <PlanTaskRow done title="Implement password hashing with bcrypt" />
              <PlanTaskRow active title="Build session persistence layer" />
              <PlanTaskRow title="Create user credential CRUD endpoints" />
              <PlanTaskRow title="Add refresh token rotation logic" />
              <PlanTaskRow title="Write auth middleware guard" />
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function ProjectCard({ project }: { project: Project }): JSX.Element {
  return (
    <div className="flex h-60 flex-col gap-4 rounded-2xl bg-zinc-50 p-6">
      <div className="flex items-center gap-2">
        <div className={cn('h-2 w-2 rounded-full', project.statusColor)} />
        <div className="flex-1" />
        <div className="rounded-full bg-sky-500/10 px-2 py-1 text-[11px] font-medium text-sky-500">
          {project.status}
        </div>
      </div>
      <div className="text-lg font-semibold text-zinc-950">{project.name}</div>
      <div className="space-y-1.5 font-mono text-xs text-zinc-400">
        <div>{project.updated}</div>
        <div>{project.files}</div>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            className="rounded-lg bg-white px-2 py-1 font-mono text-[11px] text-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function NewProjectCard(): JSX.Element {
  return (
    <button className="flex h-60 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-[#E5E7EB] bg-white">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f7f8fa]">
        <Plus className="h-6 w-6 text-zinc-400" />
      </div>
      <span className="text-sm font-medium text-zinc-400">New Project</span>
    </button>
  )
}

function SidebarSpecLink({
  children,
  path,
  icon,
  active
}: {
  children: ReactNode
  path: string
  icon: ReactNode
  active?: boolean
}): JSX.Element {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-zinc-500 transition hover:bg-white',
          (isActive || active) && 'bg-white text-zinc-950 shadow-sm'
        )
      }
      to={path}
    >
      {icon}
      <span className="truncate">{children}</span>
    </NavLink>
  )
}

function SpecToolbar({
  titleTrail,
  pills
}: {
  titleTrail: string
  pills?: ReactNode
}): JSX.Element {
  const parts = titleTrail.split(' / ')
  return (
    <div className="flex min-h-[48px] items-center gap-3 border-b border-zinc-200 bg-white px-6">
      <div className="flex items-center gap-1.5 text-[13px]">
        {parts.map((part, i) => (
          <span key={i}>
            {i > 0 && <span className="mr-1.5 text-zinc-400">/</span>}
            <span className={i === parts.length - 1 ? 'font-semibold text-zinc-950' : 'text-zinc-400'}>
              {part}
            </span>
          </span>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">{pills}</div>
    </div>
  )
}

function MarkdownArticle({ condensed }: { condensed?: boolean }): JSX.Element {
  return (
    <div className={cn('mx-auto max-w-4xl', condensed && 'max-w-none')}>
      <h1 className="text-[28px] font-bold tracking-tight text-zinc-950">
        Authentication Service Specification
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
        <span>Author: @yoophi</span>
        <span>Updated: 2026-04-05</span>
        <span className="text-sky-500">v2.1.0</span>
      </div>

      <Section title="Overview">
        The Authentication Service provides secure user authentication and authorization for all
        microservices in the platform. It supports OAuth 2.0, JWT token management, and role-based
        access control (RBAC).
      </Section>

      <Section title="Requirements">
        <div className="space-y-5">
          <div>
            <div className="mb-2 text-xl font-semibold text-zinc-900">Functional Requirements</div>
            <ul className="space-y-1 text-sm text-zinc-600">
              <li>• Support email/password and social login (Google, GitHub)</li>
              <li>• Issue and validate JWT access/refresh token pairs</li>
              <li>• Implement role-based access control with admin, user, and viewer roles</li>
              <li>• Enforce rate limiting on login endpoints (max 5 attempts/min)</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="API Endpoints">
        <div className="rounded-xl bg-zinc-950 p-4 font-mono text-xs leading-6 text-emerald-400">
          <div>POST /api/v1/auth/login</div>
          <div>POST /api/v1/auth/register</div>
          <div>GET /api/v1/auth/me</div>
          <div>POST /api/v1/auth/logout</div>
          <div>POST /api/v1/auth/password</div>
        </div>
      </Section>

      {!condensed && (
        <Section title="Dependencies">
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>NestJS for modular application structure and dependency injection.</li>
            <li>Passport for provider strategies and OAuth workflow management.</li>
            <li>Redis for refresh token revocation and active session cache.</li>
          </ul>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }): JSX.Element {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-semibold text-zinc-950">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-zinc-500">{children}</div>
    </section>
  )
}

function InfoRail(): JSX.Element {
  return (
    <div className="space-y-5 text-xs">
      <div>
        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-zinc-400">
          On This Page
        </div>
        <div className="space-y-1.5 text-zinc-500">
          <div className="font-medium text-sky-600">Overview</div>
          <div>Requirements</div>
          <div>API Endpoints</div>
          <div>Dependencies</div>
          <div>Architecture</div>
          <div>Testing Strategy</div>
        </div>
      </div>
      <div className="h-px bg-zinc-200" />
      <div>
        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-zinc-400">
          File Info
        </div>
        <div className="space-y-2">
          <KeyValue label="Last modified" value="2h ago" />
          <KeyValue label="Words" value="1,804" />
          <KeyValue label="Reading time" value="8 min" />
          <KeyValue label="Status" value="Final" valueTone="text-emerald-600" />
        </div>
      </div>
      <div className="h-px bg-zinc-200" />
      <div>
        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-zinc-400">
          Related Files
        </div>
        <div className="space-y-1.5 text-zinc-500">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" />
            plan.md
          </div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5" />
            tasks.md
          </div>
          <div className="flex items-center gap-2">
            <FileSearch className="h-3.5 w-3.5" />
            progress.md
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchField({ query }: { query: string }): JSX.Element {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-sky-400 bg-zinc-100 px-4 py-3 text-sm">
      <Search className="h-[18px] w-[18px] text-sky-500" />
      <span className="font-medium text-zinc-950">{query}</span>
      <div className="flex-1" />
      <button className="text-zinc-400">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

function FilterChip({
  children,
  active
}: {
  children: ReactNode
  active?: boolean
}): JSX.Element {
  return (
    <span
      className={cn(
        'rounded-full border border-zinc-200 px-2.5 py-1 text-zinc-500',
        active && 'border-zinc-950 bg-zinc-950 text-white'
      )}
    >
      {children}
    </span>
  )
}

function SearchResultCard({ result }: { result: SearchResult }): JSX.Element {
  const toneMap: Record<string, string> = {
    blue: 'bg-sky-100 text-sky-700',
    sky: 'bg-cyan-100 text-cyan-700',
    violet: 'bg-violet-100 text-violet-700',
    purple: 'bg-purple-100 text-purple-700',
    emerald: 'bg-emerald-100 text-emerald-700'
  }

  return (
    <div className="space-y-2 rounded-xl bg-zinc-50 p-4">
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span className="font-medium text-sky-600">{result.type}</span>
        <span className="text-zinc-400">{result.line}</span>
        <span className={cn('rounded-full px-2 py-0.5 font-medium', toneMap[result.tone])}>
          {result.label}
        </span>
      </div>
      <p className="font-mono text-xs leading-relaxed text-zinc-500">{result.excerpt}</p>
    </div>
  )
}

function TaskRow({ item }: { item: TaskItem }): JSX.Element {
  const isDone = item.state === 'done'

  return (
    <div className={cn('flex items-center gap-2.5 rounded-lg px-3 py-2', !isDone && 'bg-white')}>
      {isDone ? (
        <div className="grid h-[18px] w-[18px] place-items-center rounded bg-sky-500">
          <Check className="h-3 w-3 text-white" />
        </div>
      ) : (
        <div className="h-[18px] w-[18px] rounded border-2 border-zinc-300" />
      )}
      <span className={cn('min-w-0 flex-1 text-[13px]', isDone ? 'text-zinc-400' : 'text-zinc-600')}>
        {item.title}
      </span>
      {isDone ? (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] text-emerald-600">
          done
        </span>
      ) : (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
          todo
        </span>
      )}
    </div>
  )
}

function SettingsNav(): JSX.Element {
  const items = [
    { icon: Settings, label: 'General' },
    { icon: Terminal, label: 'Coding Agent', active: true },
    { icon: Palette, label: 'Appearance' },
    { icon: Folder, label: 'Projects' },
    { icon: Keyboard, label: 'Shortcuts' },
    { icon: Info, label: 'About' }
  ]

  return (
    <div className="space-y-0.5">
      {items.map((item) => (
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-zinc-500',
            item.active && 'bg-[#e3f0fa] font-medium text-sky-600'
          )}
          key={item.label}
        >
          <item.icon className={cn('h-4 w-4', item.active ? 'text-sky-500' : 'text-zinc-400')} />
          {item.label}
        </div>
      ))}
    </div>
  )
}

function AgentCard({
  title,
  description,
  features,
  selected,
  icon,
  iconBg,
  subtitle
}: {
  title: string
  description: string
  features: string[]
  selected?: boolean
  icon?: ReactNode
  iconBg?: string
  subtitle?: string
}): JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl bg-zinc-50 p-6',
        selected ? 'ring-2 ring-sky-500' : ''
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className={cn('grid h-10 w-10 place-items-center rounded-xl', iconBg || 'bg-zinc-950')}>
          {icon}
        </div>
        <div>
          <div className="text-[15px] font-semibold text-zinc-950">{title}</div>
          {subtitle && <div className="text-[11px] text-zinc-400">{subtitle}</div>}
        </div>
        {selected && (
          <span className="ml-auto rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-medium text-white">
            Selected
          </span>
        )}
      </div>
      <p className="text-[13px] leading-6 text-zinc-500">{description}</p>
      <div className="mt-auto space-y-1.5">
        {features.map((feature) => (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500" key={feature}>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingRow({
  label,
  value,
  trailing,
  description,
  dropdown
}: {
  label: string
  value: string
  trailing?: ReactNode
  description?: string
  dropdown?: boolean
}): JSX.Element {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-zinc-50 px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-zinc-950">{label}</div>
        {description && <div className="mt-0.5 text-xs text-zinc-400">{description}</div>}
      </div>
      {trailing ?? (
        <div className="flex w-[280px] items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-xs text-zinc-500">
          {value}
          {dropdown && (
            <>
              <div className="flex-1" />
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </>
          )}
        </div>
      )}
    </div>
  )
}

function TechCard({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4">
      <div className="text-xs uppercase tracking-[0.12em] text-zinc-400">{label}</div>
      <div className="mt-2 text-sm font-medium text-zinc-800">{value}</div>
    </div>
  )
}

function PrincipleCard({
  index,
  title,
  body
}: {
  index: string
  title: string
  body: string
}): JSX.Element {
  return (
    <div className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
      <div className="grid h-6 w-6 place-items-center rounded-full bg-sky-500 text-xs font-semibold text-white">
        {index}
      </div>
      <div>
        <div className="font-medium text-zinc-900">{title}</div>
        <p className="mt-1 text-sm text-zinc-500">{body}</p>
      </div>
    </div>
  )
}

function KeyValue({
  label,
  value,
  valueTone
}: {
  label: string
  value: string
  valueTone?: string
}): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="text-zinc-400">{label}</span>
      <span className={cn('font-medium text-zinc-600', valueTone)}>{value}</span>
    </div>
  )
}

function Pill({
  children,
  tone
}: {
  children: ReactNode
  tone: 'green' | 'amber' | 'blue'
}): JSX.Element {
  const toneClass =
    tone === 'green'
      ? 'bg-emerald-100 text-emerald-700'
      : tone === 'amber'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-sky-100 text-sky-700'

  return <span className={cn('rounded-full px-2 py-1 text-[10px] font-medium', toneClass)}>{children}</span>
}

function PhaseCard({
  title,
  days,
  badge,
  active,
  phase,
  description
}: {
  title: string
  days: string
  badge: string
  active?: boolean
  phase?: number
  description?: string
}): JSX.Element {
  const isCompleted = badge === 'Completed'
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl bg-zinc-50 p-5',
        active ? 'bg-white ring-2 ring-sky-500' : ''
      )}
    >
      <div className="flex items-center gap-2 text-[11px] font-bold">
        {isCompleted ? (
          <CircleCheck className="h-[18px] w-[18px] text-emerald-500" />
        ) : active ? (
          <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />
        ) : (
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
        )}
        <span className={cn(isCompleted ? 'text-emerald-500' : active ? 'text-sky-500' : 'text-zinc-400')}>
          Phase {phase}
        </span>
        {active && (
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[9px] font-bold tracking-wide text-sky-500">
            CURRENT
          </span>
        )}
      </div>
      <div className={cn('text-[15px] font-semibold', active ? 'text-zinc-950' : 'text-zinc-400')}>{title}</div>
      {description && (
        <p className={cn('text-xs leading-relaxed', active ? 'text-zinc-500' : 'text-zinc-400')}>{description}</p>
      )}
      <div className={cn('mt-auto font-mono text-[11px]', isCompleted ? 'text-emerald-500' : active ? 'text-sky-500' : 'text-zinc-400')}>
        {days}
      </div>
    </div>
  )
}

function PlanTaskRow({
  title,
  done,
  active
}: {
  title: string
  done?: boolean
  active?: boolean
}): JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg px-4 py-3',
        active ? 'border border-sky-400 bg-sky-50' : 'bg-zinc-50'
      )}
    >
      {done ? (
        <CircleCheck className="h-[18px] w-[18px] text-emerald-500" />
      ) : active ? (
        <Loader className="h-[18px] w-[18px] text-sky-500" />
      ) : (
        <Circle className="h-[18px] w-[18px] text-zinc-300" />
      )}
      <span className={cn('min-w-0 flex-1 text-[13px]', done ? 'text-zinc-400' : active ? 'font-medium text-zinc-950' : 'text-zinc-500')}>
        {title}
      </span>
      <span className={cn('font-mono text-[11px]', done ? 'text-emerald-500' : active ? 'text-sky-500' : 'text-zinc-400')}>
        {done ? 'Done' : active ? 'In Progress' : 'To Do'}
      </span>
    </div>
  )
}

function ResearchViewerPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar
            pills={<span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-medium text-violet-600">Research Notes</span>}
            titleTrail="auth-service / 001-setup-base-architecture / research.md"
          />
          <div className="min-h-0 flex-1 overflow-auto px-12 py-8">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-950">Research Notes</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">
              Investigation findings and technical decisions for the authentication service architecture
            </p>

            <div className="mt-8 flex items-center gap-2">
              <GitCompare className="h-[18px] w-[18px] text-sky-500" />
              <h2 className="text-xl font-semibold text-zinc-950">Authentication Protocol Comparison</h2>
            </div>
            <div className="mt-1 h-px bg-zinc-200" />

            <div className="mt-4 grid gap-4 xl:grid-cols-3">
              <ResearchCard
                cons={['Complex initial setup']}
                icon={<ShieldCheck className="h-[18px] w-[18px] text-sky-500" />}
                pros={['Industry standard, wide library support', 'Built-in token refresh & revocation']}
                selected
                title="OAuth 2.0 + OIDC"
              />
              <ResearchCard
                cons={['XML-heavy, verbose payloads', 'Poor mobile/SPA support']}
                icon={<FileKey className="h-[18px] w-[18px] text-zinc-400" />}
                pros={['Enterprise SSO standard', 'Mature ecosystem & tooling']}
                title="SAML 2.0"
              />
              <ResearchCard
                cons={['No standard — security audit burden', 'Must build refresh/revocation manually']}
                icon={<Key className="h-[18px] w-[18px] text-zinc-400" />}
                pros={['Full control over token structure', 'Lightweight, fast validation']}
                title="Custom JWT"
              />
            </div>

            <div className="mt-8 flex items-center gap-2">
              <CircleCheck className="h-[18px] w-[18px] text-sky-500" />
              <h2 className="text-xl font-semibold text-zinc-950">Key Decisions</h2>
            </div>
            <div className="mt-1 h-px bg-zinc-200" />

            <div className="mt-4 space-y-4">
              <DecisionCard
                description="Asymmetric keys allow public verification without sharing secrets. Critical for microservice architectures where multiple services validate tokens independently."
                index={1}
                title="Use RS256 over HS256 for JWT signing"
              />
              <DecisionCard
                description="Token validation happens on every request. Redis provides sub-millisecond lookups with automatic TTL expiration matching token lifetimes, eliminating cleanup jobs."
                index={2}
                title="Redis for token blacklist over DB table"
              />
              <DecisionCard
                description="Fixed windows allow burst traffic at window boundaries. Sliding window provides smoother rate enforcement and better protection against credential stuffing attacks."
                index={3}
                title="Sliding window rate limiting over fixed window"
              />
            </div>

            <div className="mt-8 flex items-center gap-2">
              <Link className="h-[18px] w-[18px] text-sky-500" />
              <h2 className="text-xl font-semibold text-zinc-950">References</h2>
            </div>
            <div className="mt-1 h-px bg-zinc-200" />

            <div className="mt-4 space-y-2.5">
              {[
                'RFC 6749 — The OAuth 2.0 Authorization Framework',
                'OpenID Connect Core 1.0 Specification',
                'JSON Web Token Best Current Practices (RFC 8725)',
                'Redis Documentation — Keys with Expiration',
                'OWASP Authentication Cheat Sheet'
              ].map((ref) => (
                <div className="flex items-center gap-2.5 text-[13px] text-sky-500" key={ref}>
                  <ExternalLink className="h-3.5 w-3.5" />
                  {ref}
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function ResearchCard({
  title,
  icon,
  pros,
  cons,
  selected
}: {
  title: string
  icon: ReactNode
  pros: string[]
  cons: string[]
  selected?: boolean
}): JSX.Element {
  return (
    <div className={cn('flex flex-col gap-3 rounded-xl bg-zinc-50 p-5', selected && 'ring-2 ring-sky-500')}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[15px] font-semibold text-zinc-950">{title}</span>
        {selected && (
          <>
            <div className="flex-1" />
            <span className="rounded-full bg-sky-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-sky-500">SELECTED</span>
          </>
        )}
      </div>
      <div className="h-px bg-zinc-200" />
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-emerald-600">Pros</div>
        {pros.map((p) => (
          <div className="text-[13px] text-zinc-500" key={p}>  {p}</div>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-red-600">Cons</div>
        {cons.map((c) => (
          <div className="text-[13px] text-zinc-500" key={c}>  {c}</div>
        ))}
      </div>
    </div>
  )
}

function DecisionCard({
  index,
  title,
  description
}: {
  index: number
  title: string
  description: string
}): JSX.Element {
  return (
    <div className="flex gap-4 rounded-xl bg-zinc-50 p-5">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-500 font-mono text-sm font-bold text-white">
        {index}
      </div>
      <div>
        <div className="text-[15px] font-semibold text-zinc-950">{title}</div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">{description}</p>
      </div>
    </div>
  )
}

function QuickstartViewerPage(): JSX.Element {
  return (
    <AppFrame
      content={
        <div className="flex h-screen flex-col bg-white">
          <SpecToolbar
            pills={<span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">Quick Start</span>}
            titleTrail="auth-service / 001-setup-base-architecture / quickstart.md"
          />
          <div className="min-h-0 flex-1 overflow-auto px-12 py-8">
            <h1 className="text-[28px] font-bold tracking-tight text-zinc-950">Quick Start Guide</h1>
            <p className="mt-3 text-[15px] text-zinc-500">
              Get the auth-service up and running in under 5 minutes.
            </p>

            <div className="mt-8 space-y-3">
              <h2 className="text-xl font-semibold text-zinc-950">Prerequisites</h2>
              <div className="space-y-2">
                {['Node.js 18+', 'Docker Desktop', 'PostgreSQL 16'].map((item) => (
                  <div className="flex items-center gap-2.5 text-sm text-zinc-950" key={item}>
                    <Check className="h-4 w-4 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-zinc-950">Installation</h2>
              <QuickstartStep code="git clone https://github.com/team/auth-service.git" label="Clone the repository" step={1} />
              <QuickstartStep code="npm install" label="Install dependencies" step={2} />
              <QuickstartStep code="cp .env.example .env" label="Set up environment" step={3} />
            </div>

            <div className="mt-8 space-y-3">
              <h2 className="text-xl font-semibold text-zinc-950">Run Development Server</h2>
              <div className="rounded-lg bg-zinc-950 px-4 py-3 font-mono text-[13px] text-white">
                docker-compose up -d &amp;&amp; npm run dev
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 px-5 py-4">
              <CircleCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-900">
                Server running at http://localhost:3000
              </span>
            </div>
          </div>
        </div>
      }
      sidebar={<SharedSidebar />}
    />
  )
}

function QuickstartStep({
  step,
  label,
  code
}: {
  step: number
  label: string
  code: string
}): JSX.Element {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="grid h-[22px] w-[22px] place-items-center rounded-full bg-sky-500 text-xs font-semibold text-white">
          {step}
        </div>
        <span className="text-sm font-medium text-zinc-950">{label}</span>
      </div>
      <div className="rounded-lg bg-zinc-950 px-4 py-3 font-mono text-[13px] text-white">
        {code}
      </div>
    </div>
  )
}

function AddProjectDialogPage(): JSX.Element {
  return (
    <div className="grid h-screen place-items-center bg-black/40">
      <div className="w-[520px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-100">
            <FolderPlus className="h-5 w-5 text-sky-500" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold text-zinc-950">Add Project</div>
            <div className="text-[13px] text-zinc-400">Connect a project directory to start managing spec files.</div>
          </div>
          <button className="text-zinc-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-px bg-zinc-200" />

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          <DialogField label="Project Name">
            <div className="rounded-lg border border-zinc-200 px-3.5 py-2.5 text-sm text-zinc-950">
              my-new-service
            </div>
          </DialogField>

          <DialogField hint="Select a directory that contains or will contain spec files." label="Project Directory">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3.5 py-2.5 text-sm">
              <Folder className="h-4 w-4 text-zinc-400" />
              <span className="font-mono text-[13px] text-zinc-500">~/projects/my-new-service</span>
              <div className="flex-1" />
              <span className="text-xs font-medium text-sky-500">Browse</span>
            </div>
          </DialogField>

          <DialogField label="Coding Agent">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3.5 py-2.5 text-sm">
              <Terminal className="h-4 w-4 text-zinc-400" />
              <span className="text-zinc-950">Claude Code</span>
              <div className="flex-1" />
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </div>
          </DialogField>

          <div className="flex items-center gap-3">
            <div className="grid h-[18px] w-[18px] place-items-center rounded bg-sky-500">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-[13px] text-zinc-500">Initialize constitution.md automatically</span>
          </div>
        </div>
        <div className="h-px bg-zinc-200" />

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-500">
            Cancel
          </button>
          <button className="flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white">
            <FolderPlus className="h-3.5 w-3.5" />
            Add Project
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteProjectDialogPage(): JSX.Element {
  return (
    <div className="grid h-screen place-items-center bg-black/40">
      <div className="w-[440px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-6 py-6">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-zinc-950">Delete Project?</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              This will remove &quot;auth-service&quot; from Speckit Manager.
              <br />
              Your files on disk will not be deleted.
            </p>
          </div>
          <div className="flex w-full items-start gap-2.5 rounded-lg bg-amber-50 px-4 py-3">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-xs leading-relaxed text-amber-900">
              This project has 5 specs with unsaved changes. Make sure to save your work before proceeding.
            </p>
          </div>
        </div>
        <div className="h-px bg-zinc-200" />

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4">
          <button className="flex-1 rounded-full border border-zinc-200 py-2.5 text-center text-sm font-medium text-zinc-500">
            Cancel
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-red-600 py-2.5 text-sm font-medium text-white">
            <Trash2 className="h-4 w-4" />
            Delete Project
          </button>
        </div>
      </div>
    </div>
  )
}

function DialogField({
  label,
  hint,
  children
}: {
  label: string
  hint?: string
  children: ReactNode
}): JSX.Element {
  return (
    <div className="space-y-1.5">
      <div className="text-[13px] font-medium text-zinc-950">{label}</div>
      {children}
      {hint && <div className="text-xs text-zinc-400">{hint}</div>}
    </div>
  )
}

export default App
