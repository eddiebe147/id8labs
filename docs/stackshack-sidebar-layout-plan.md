# StackShack Sidebar Layout Plan

## Why Sidebar Makes Sense

### Current Problems
- Filters take up horizontal space in sticky header
- How-to content has nowhere to go
- Starter Kits interrupt main flow
- Category browsing is at bottom (requires scroll)

### Sidebar Benefits
✅ Persistent navigation (always visible)  
✅ More filter options without cluttering main area  
✅ Natural home for secondary content  
✅ Standard marketplace pattern (Amazon, GitHub, etc.)  
✅ Better mobile experience (drawer pattern)

---

## Proposed Layout with Sidebar

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (sticky)                         │
│  Logo    Search bar (full width)              Stats badges     │
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬─────────────────────────────────────────────────┐
│              │                                                  │
│   SIDEBAR    │              MAIN CONTENT                        │
│   (260px)    │              (flex-1)                            │
│              │                                                  │
│ ┌──────────┐│  ┌────────────────────────────────────────────┐│
│ │ FILTERS  ││  │                                             ││
│ │          ││  │  RESULTS GRID (4 columns)                   ││
│ │ Type     ││  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐              ││
│ │ ○ All    ││  │  │📦  │ │🤖  │ │📝  │ │💻  │              ││
│ │ ○ Skills ││  │  └────┘ └────┘ └────┘ └────┘              ││
│ │ ○ Agents ││  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐              ││
│ │          ││  │  │🎨  │ │📊  │ │✍️  │ │🔍  │              ││
│ │Categories││  │  └────┘ └────┘ └────┘ └────┘              ││
│ │ □ All    ││  │                                             ││
│ │ □ Code💻││  │  (190+ skills, filters instantly)            ││
│ │ □ Docs📄││  │                                             ││
│ │ □ Design🎨│  │                                             ││
│ │ □ Writing✍│  │                                             ││
│ │ ...      ││  │                                             ││
│ └──────────┘│  └────────────────────────────────────────────┘│
│              │                                                  │
│ ┌──────────┐│                                                  │
│ │QUICK START│                                                 │
│ │          ││                                                  │
│ │⚡Starter ││                                                  │
│ │  Kits    ││                                                  │
│ │  • Dev   ││                                                  │
│ │  • Content│                                                 │
│ │  • PM    ││                                                  │
│ │[Browse all]│                                                │
│ └──────────┘│                                                  │
│              │                                                  │
│ ┌──────────┐│                                                  │
│ │ HELP     ││                                                  │
│ │          ││                                                  │
│ │ ▶ How to ││                                                  │
│ │   Install││                                                  │
│ │          ││                                                  │
│ │ ▶ Skills ││                                                  │
│ │   vs     ││                                                  │
│ │   Agents ││                                                  │
│ └──────────┘│                                                  │
│              │                                                  │
└──────────────┴─────────────────────────────────────────────────┘
```

---

## Sidebar Content Breakdown

### 1. FILTERS SECTION (Top Priority)
```
┌─────────────────────┐
│ 🎚️ FILTERS          │
├─────────────────────┤
│ Type                │
│ ○ All Items (190)   │
│ ○ Skills (152)      │
│ ○ Agents (38)       │
│                     │
│ Categories          │
│ ☑ All              │
│ ☐ Code 💻 (45)     │
│ ☐ Documents 📄 (32)│
│ ☐ Design 🎨 (28)   │
│ ☐ Writing ✍️ (24)  │
│ ☐ Business 💼 (19) │
│ [Show all 11]       │
│                     │
│ Complexity          │
│ ☐ Simple           │
│ ☐ Complex          │
│ ☐ Multi-Agent      │
│                     │
│ [Clear Filters]     │
└─────────────────────┘
```

**Benefits:**
- More filter options (complexity, quality tier, etc.)
- Checkboxes for multi-select categories
- Counts next to each option
- Clear filters button

### 2. QUICK START SECTION (Mid Priority)
```
┌─────────────────────┐
│ ⚡ QUICK START      │
├─────────────────────┤
│ Starter Kits        │
│                     │
│ 📦 Frontend Dev     │
│    12 skills        │
│                     │
│ ✍️ Content Creator │
│    11 skills        │
│                     │
│ 💼 Product Manager │
│    13 skills        │
│                     │
│ [Browse All Kits →]│
└─────────────────────┘
```

**Benefits:**
- Quick access to starter kits
- Doesn't interrupt main flow
- Easy to add/install bundles

### 3. HELP SECTION (Low Priority - Collapsible)
```
┌─────────────────────┐
│ 💡 HELP            │
├─────────────────────┤
│ ▶ How to Install   │
│                     │
│ ▶ Skills vs Agents │
│                     │
│ ▶ Best Practices   │
│                     │
│ [Full Guide →]     │
└─────────────────────┘
```

**Benefits:**
- Always accessible but not intrusive
- Expandable accordions
- Link to full guide page

### 4. FEATURED/POPULAR (Optional)
```
┌─────────────────────┐
│ ⭐ POPULAR         │
├─────────────────────┤
│ 1. Email Composer   │
│    ⭐⭐⭐⭐⭐      │
│                     │
│ 2. API Builder      │
│    ⭐⭐⭐⭐⭐      │
│                     │
│ 3. Data Analyzer    │
│    ⭐⭐⭐⭐       │
│                     │
│ [View All →]       │
└─────────────────────┘
```

**Benefits:**
- Highlights top items
- Social proof
- Easy discovery

---

## Main Content Area Changes

### Cleaner Header (No Sticky Filters)
```
┌────────────────────────────────────────────┐
│ STACKSHACK LOGO                             │
│ Free skills & agents for Claude Code        │
│                                              │
│ [Search 190+ skills and agents...........]  │
│                                              │
│ • 11 Categories  • 100% Free  • Verified    │
└────────────────────────────────────────────┘
```

**Benefits:**
- Simpler, cleaner hero
- More space for search bar
- No competing visual elements

### Pure Results Grid
```
┌─────┬─────┬─────┬─────┐
│ Skill│Agent│Skill│Skill│  ← Featured badge on some
├─────┼─────┼─────┼─────┤
│Agent│Skill│Skill│Agent│
├─────┼─────┼─────┼─────┤
│Skill│Skill│Agent│Skill│
├─────┼─────┼─────┼─────┤
│ ...  ...  ...  ... │
└─────┴─────┴─────┴─────┘

Showing 45 of 190 items
```

**Benefits:**
- Clean grid layout
- 4 columns on desktop
- Responsive (2 cols tablet, 1 col mobile)
- Instant filtering

---

## Mobile Experience

### Sidebar → Drawer
```
Mobile:
┌──────────────────────┐
│ ☰ Filters  Search... │  ← Header
└──────────────────────┘
┌──────────────────────┐
│ Skill Card (full width)│
├──────────────────────┤
│ Skill Card           │
├──────────────────────┤
│ Agent Card           │
└──────────────────────┘

Tap ☰ → Drawer slides in from left
┌──────────────────────┐
│ [X] FILTERS          │
│                      │
│ Type: Skills         │
│ Category: Code       │
│ ...                  │
│                      │
│ [Apply Filters]      │
└──────────────────────┘
```

**Benefits:**
- Mobile-first pattern
- Familiar UX (every marketplace does this)
- More screen space for content

---

## Technical Implementation

### 1. New Component: `SkillsSidebar.tsx`
```tsx
'use client'

import { useState } from 'react'
import { FilterSection } from './FilterSection'
import { StarterKitsWidget } from './StarterKitsWidget'
import { HelpAccordion } from './HelpAccordion'

export function SkillsSidebar({
  categories,
  onFilterChange
}: SkillsSidebarProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])

  return (
    <aside className="w-64 flex-shrink-0 space-y-6 sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Filters */}
      <FilterSection
        typeFilter={typeFilter}
        categoryFilters={categoryFilters}
        onTypeChange={setTypeFilter}
        onCategoryChange={setCategoryFilters}
      />

      {/* Quick Start */}
      <StarterKitsWidget />

      {/* Help */}
      <HelpAccordion />
    </aside>
  )
}
```

### 2. Updated Layout: `page.tsx`
```tsx
export default async function SkillsPage() {
  const allSkills = await getAllSkills() // Get ALL skills

  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Sidebar + Content */}
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <SkillsSidebar 
            categories={categories}
            onFilterChange={handleFilterChange}
          />

          {/* Main Content */}
          <div className="flex-1">
            <SkillsGrid skills={allSkills} />
          </div>
        </div>
      </div>
    </main>
  )
}
```

### 3. Client-Side Filtering
```tsx
'use client'

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const [filtered, setFiltered] = useState(skills)
  
  // Filter logic based on sidebar state
  
  return (
    <div>
      <div className="mb-4 text-sm text-[var(--text-secondary)]">
        Showing {filtered.length} of {skills.length} items
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}
```

---

## Layout Comparison

### WITHOUT Sidebar (Current)
```
Problems:
❌ Filters in sticky header (cramped)
❌ How-to section takes full width
❌ Starter Kits interrupt flow
❌ Category cards at bottom only
❌ Can't see filters while browsing
```

### WITH Sidebar
```
Benefits:
✅ Persistent filters (always visible)
✅ More filter options (complexity, etc.)
✅ Starter Kits in sidebar (easy access)
✅ Help available but not intrusive
✅ Cleaner main content area
✅ Standard marketplace pattern
✅ Better mobile experience (drawer)
```

---

## Sidebar Width Options

### Option A: Fixed 260px (Recommended)
```
Sidebar: 260px fixed
Content: calc(100% - 260px - 32px gap)
```
**Pros:** Predictable, good for filters  
**Cons:** Less content width

### Option B: Fixed 320px (Wider)
```
Sidebar: 320px fixed
Content: calc(100% - 320px - 32px gap)
```
**Pros:** More room for widgets  
**Cons:** Takes significant space

### Option C: Collapsible 260px → 60px
```
Sidebar: 260px (expanded) or 60px (collapsed)
Content: Flex-1
```
**Pros:** User control, max flexibility  
**Cons:** More complex to implement

**Recommendation:** Start with Option A (260px fixed)

---

## Content Reorganization Summary

### What Goes Where?

| Current Location | New Location |
|------------------|--------------|
| Category tabs (sticky header) | Sidebar > Filters |
| Type filter (sticky header) | Sidebar > Filters |
| How to Use (full section) | Sidebar > Help (collapsed) |
| Starter Kits (section) | Sidebar > Quick Start |
| Featured Skills (section) | Main grid with badge |
| Recently Added (section) | Main grid with badge |
| Browse by Category (bottom) | **Remove** (now in sidebar) |

---

## Implementation Phases

### Phase 1: Basic Sidebar (MVP)
- [ ] Create SkillsSidebar component
- [ ] Add Type filter (All/Skills/Agents)
- [ ] Add Category checkboxes
- [ ] Move main content to grid layout
- [ ] Implement client-side filtering

**Estimated Time:** 4-6 hours

### Phase 2: Enhanced Sidebar
- [ ] Add Starter Kits widget
- [ ] Add collapsible Help section
- [ ] Add complexity filter
- [ ] Add "Clear filters" button
- [ ] Add filter counts

**Estimated Time:** 3-4 hours

### Phase 3: Mobile Optimization
- [ ] Implement drawer pattern for mobile
- [ ] Add filter button in mobile header
- [ ] Test responsive behavior
- [ ] Optimize touch targets

**Estimated Time:** 3-4 hours

### Phase 4: Polish
- [ ] Add smooth transitions
- [ ] Add loading states
- [ ] Update e2e tests
- [ ] Performance optimization
- [ ] Analytics tracking

**Estimated Time:** 2-3 hours

---

## Mobile Wireframe

```
┌─────────────────────────┐
│ ☰  🔍 Search...    [⚙] │  ← Mobile header
└─────────────────────────┘
│                         │
│   ┌─────────────────┐  │
│   │                 │  │
│   │   Skill Card    │  │  ← Single column
│   │                 │  │
│   └─────────────────┘  │
│                         │
│   ┌─────────────────┐  │
│   │                 │  │
│   │   Agent Card    │  │
│   │                 │  │
│   └─────────────────┘  │
│                         │

Tap ☰ →
┌─────────────────────────┐
│ [X] FILTERS             │
│                         │
│ Type                    │
│ ○ All  ○ Skills ○ Agents│
│                         │
│ Categories              │
│ ☐ Code    ☐ Docs       │
│ ☐ Design  ☐ Writing     │
│                         │
│ ⚡ Starter Kits        │
│ • Frontend Dev          │
│ • Content Creator       │
│                         │
│ 💡 Help                │
│ ▶ How to Install       │
│                         │
│ [Apply Filters]         │
└─────────────────────────┘
```

---

## Pros & Cons

### Pros
✅ Standard marketplace pattern (familiar)  
✅ Persistent filters (no scrolling to change)  
✅ More filter options (complexity, quality, etc.)  
✅ Natural home for secondary content  
✅ Cleaner main content area  
✅ Better mobile experience (drawer)  
✅ Easier to add new filters/widgets  

### Cons
❌ More complex implementation (sidebar state)  
❌ Less horizontal space for content  
❌ Mobile drawer adds interaction step  
❌ Sticky positioning can be tricky  

**Verdict:** ✅ Pros outweigh cons. Sidebar is the right choice.

---

## Inspiration Examples

### Amazon
- Left sidebar with filters
- Persistent category navigation
- Main content grid
- Mobile drawer pattern

### GitHub Marketplace
- Left sidebar with categories
- Type filters at top
- Grid of items
- Clean, scannable

### VS Code Extensions
- Left sidebar with categories
- Search at top
- List/grid view toggle
- Filter by verified, popular, etc.

---

## Next Steps

**Decision Point:** Do we want sidebar?

### If YES:
1. Approve this plan
2. Create SkillsSidebar component
3. Implement basic filters (Type + Category)
4. Move content to grid layout
5. Test & iterate

### If NO:
Fall back to original plan:
- Collapsible How-to
- Unified grid
- Sticky filters in header

---

**Status:** 📋 Awaiting Decision  
**Recommendation:** ✅ YES to Sidebar  
**Estimated Total Effort:** 12-17 hours (all phases)  
**Priority:** High (Major UX improvement)
