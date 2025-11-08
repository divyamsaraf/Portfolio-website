# 🤝 Collaboration Roles Setup Guide

## Overview

The new `collaboration_roles` field allows you to display collaboration opportunities directly in the Hero section. This replaces the separate "Open for Collaboration" section with a more prominent, integrated approach.

---

## 📋 What Are Collaboration Roles?

Collaboration roles are short, professional statements about the types of work you're open to. They appear as styled badges above the "Connect with Me" section in the Hero.

**Examples:**
- "Open Source Contribution"
- "Collaboration Projects"
- "Technical Mentoring"
- "Freelance Work"
- "Consulting"
- "Speaking Engagements"

---

## 🔧 Setup Instructions

### Step 1: Update Supabase

Run the migration to add the column:

```sql
ALTER TABLE hero ADD COLUMN IF NOT EXISTS 
  collaboration_roles TEXT[] DEFAULT ARRAY[
    'Open Source Contribution',
    'Collaboration Projects',
    'Technical Mentoring'
  ];
```

### Step 2: Update Hero Record

In Supabase, update your hero record with collaboration roles:

```sql
UPDATE hero 
SET collaboration_roles = ARRAY[
  'Open Source Contribution',
  'Collaboration Projects',
  'Technical Mentoring'
]
WHERE id = 1;
```

### Step 3: Verify in Frontend

Visit your portfolio homepage. You should see the collaboration roles displayed as styled badges above "Connect with Me".

---

## 🎨 Customization

### Change Collaboration Roles

**Via Supabase Admin:**
1. Go to Supabase Dashboard
2. Open `hero` table
3. Edit the `collaboration_roles` array
4. Save changes
5. Changes appear immediately on your site

**Example Array:**
```json
[
  "Open Source Contribution",
  "Collaboration Projects",
  "Technical Mentoring",
  "Freelance Work",
  "Consulting"
]
```

### Styling

The collaboration roles use this styling:
```css
px-4 py-2 rounded-full 
bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
border border-cyan-400/30 
text-cyan-300 
text-sm font-medium 
backdrop-blur-sm
```

To customize, edit `src/components/sections/Hero.tsx` line ~165.

---

## 📝 Best Practices

### 1. Keep It Concise
- Use 2-4 words per role
- Make them scannable
- Be specific about what you're open to

### 2. Professional Tone
- ✅ "Open Source Contribution"
- ❌ "I like open source"

### 3. Relevant to Your Goals
- Align with your career objectives
- Match your target audience
- Update as your goals change

### 4. Limit to 3-5 Roles
- Too many dilutes the message
- Keep it focused
- Easier to read

---

## 🔄 How It Works

### Frontend Flow:
1. Hero component fetches hero data from Supabase
2. Extracts `collaboration_roles` array
3. Maps over array and renders styled badges
4. Each badge shows with ✨ emoji

### Code:
```typescript
{hero.collaboration_roles && hero.collaboration_roles.length > 0 && (
  <motion.div className="mb-12 flex flex-wrap gap-3 justify-center">
    {hero.collaboration_roles.map((role, idx) => (
      <motion.span key={idx} className="px-4 py-2 rounded-full ...">
        ✨ {role}
      </motion.span>
    ))}
  </motion.div>
)}
```

---

## 🐛 Troubleshooting

### Roles Not Showing?

1. **Check Supabase:**
   - Verify `collaboration_roles` column exists
   - Verify data is in the array format
   - Check RLS policies allow read access

2. **Check Frontend:**
   - Open browser console (F12)
   - Check for errors
   - Verify hero data is fetching

3. **Clear Cache:**
   ```bash
   npm run build
   npm run dev
   ```

### Array Format Issues?

**Correct Format (PostgreSQL):**
```sql
ARRAY['Role 1', 'Role 2', 'Role 3']
```

**Incorrect:**
```sql
['Role 1', 'Role 2', 'Role 3']  -- Wrong
"Role 1, Role 2, Role 3"        -- Wrong
```

---

## 📱 Mobile Responsiveness

The collaboration roles are fully responsive:
- **Desktop:** Horizontal flex layout
- **Tablet:** Wraps as needed
- **Mobile:** Stacks vertically

---

## 🔐 Security

- Collaboration roles are public (read-only)
- Only admins can edit via Supabase
- No sensitive data should be stored here
- Changes are immediate (no caching)

---

## 🎯 Examples

### Tech Professional:
```json
[
  "Open Source Contribution",
  "Technical Mentoring",
  "Consulting"
]
```

### Freelancer:
```json
[
  "Freelance Projects",
  "Contract Work",
  "Consulting"
]
```

### Speaker:
```json
[
  "Speaking Engagements",
  "Podcast Appearances",
  "Technical Writing"
]
```

### Mentor:
```json
[
  "Technical Mentoring",
  "Code Reviews",
  "Career Guidance"
]
```

---

## 📞 Support

**Issues?** Check:
1. Supabase column exists
2. Data is in array format
3. RLS policies allow read
4. Browser cache cleared
5. Build is fresh

**Questions?** Review:
- `src/components/sections/Hero.tsx`
- `src/lib/types.ts` (Hero interface)
- `SUPABASE_MIGRATIONS.sql`

---

## ✅ Checklist

- [ ] Migration run in Supabase
- [ ] Hero record updated with collaboration_roles
- [ ] Roles display on homepage
- [ ] Styling looks good
- [ ] Mobile responsive
- [ ] Ready for production

**You're all set!** 🎉

