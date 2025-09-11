import fg from "fast-glob";

/**
 * แปลงรายชื่อไฟล์ md ใน path เป็น SidebarItem[]
 * - จะข้าม index.md อัตโนมัติ (แต่เพิ่มลิงก์ Intro ให้)
 * - เรียงตามชื่อไฟล์ (แก้ลำดับด้วยพรีฟิกซ์ตัวเลข 01_, 02_ ได้)
 */
export function autoSidebar(base: string) {
  // base เช่น '/services/acs-be/'
  const globBase = `docs${base}**/*.md`;
  const entries = fg.sync(globBase, { dot: false });

  const items = entries
    .map((p) => p.replace(/^docs/, "").replace(/\.md$/, ""))
    .filter((p) => !p.endsWith("/index")) // index จะแสดงเป็น Intro แยก
    .sort()
    .map((p) => {
      const parts = p.split("/").filter(Boolean);
      const text = parts[parts.length - 1]
        .replace(/^\d+[_-]?/, "") // ตัดพรีฟิกซ์ตัวเลขจัดลำดับ
        .replace(/-/g, " ");
      return { text: capitalize(text), link: p };
    });

  // group แบบง่าย: แยกตามโฟลเดอร์ลูกระดับแรกใต้ base
  const groupsMap: Record<string, { text: string; items: any[] }> = {};

  for (const it of items) {
    const rel = it.link.replace(base, "");
    const seg = rel.split("/")[0];
    if (rel.includes("/")) {
      // มีโฟลเดอร์ย่อย
      const g = (groupsMap[seg] ||= { text: capitalize(seg), items: [] });
      g.items.push(it);
    } else {
      // อยู่ตรง base
      (groupsMap["__root__"] ||= { text: "Overview", items: [] }).items.push(
        it
      );
    }
  }

  const sidebar: any[] = [];

  // Intro
  sidebar.push({
    text: "Overview",
    collapsed: false,
    items: [{ text: "Intro", link: base }],
  });

  // ไฟล์ที่อยู่บน root ของ base
  if (groupsMap["__root__"]?.items?.length) {
    sidebar[0].items.push(...groupsMap["__root__"].items);
  }

  // โฟลเดอร์ย่อย
  for (const [k, g] of Object.entries(groupsMap)) {
    if (k === "__root__") continue;
    sidebar.push({ text: g.text, collapsed: true, items: g.items });
  }

  return sidebar;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
