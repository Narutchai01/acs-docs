# Git 101: คู่มือเริ่มต้นสำหรับมือใหม่

## สารบัญ

- [Git คืออะไร?](#git-คืออะไร)
- [การติดตั้ง Git](#การติดตั้ง-git)
- [การตั้งค่าเริ่มต้น](#การตั้งค่าเริ่มต้น)
- [คำสั่งพื้นฐาน](#คำสั่งพื้นฐาน)
- [การทำงานกับ Repository](#การทำงานกับ-repository)
- [Branching และ Merging](#branching-และ-merging)
- [การทำงานร่วมกับทีม](#การทำงานร่วมกับทีม)
- [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
- [เทคนิคและ Tips](#เทคนิคและ-tips)

## Git คืออะไร?

Git เป็นระบบควบคุมเวอร์ชัน (Version Control System) ที่ช่วยให้เราสามารถ:

- ติดตามการเปลี่ยนแปลงของไฟล์
- กลับไปยังเวอร์ชันก่อนหน้าได้
- ทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพ
- สร้าง branch สำหรับพัฒนา feature ใหม่
- รวม (merge) การเปลี่ยนแปลงจากหลายคน

### ประโยชน์ของ Git

- **ติดตามประวัติ**: เห็นว่าใครแก้ไขอะไรเมื่อไหร่
- **สำรองข้อมูล**: ไฟล์ไม่หายแม้คอมพิวเตอร์เสีย
- **ทำงานร่วมกัน**: หลายคนแก้ไขไฟล์เดียวกันได้
- **ทดลอง feature**: สร้าง branch ใหม่ทดลองโดยไม่กระทบโค้ดหลัก

## การติดตั้ง Git

### macOS

```bash
# ใช้ Homebrew
brew install git

# หรือดาวน์โหลดจาก https://git-scm.com/
```

### Windows

```bash
# ดาวน์โหลดจาก https://git-scm.com/
# หรือใช้ Chocolatey
choco install git
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

### ตรวจสอบการติดตั้ง

```bash
git --version
```

## การตั้งค่าเริ่มต้น

หลังติดตั้ง Git แล้ว ต้องตั้งค่าข้อมูลส่วนตัว:

```bash
# ตั้งค่าชื่อ
git config --global user.name "ชื่อของคุณ"

# ตั้งค่าอีเมล
git config --global user.email "your.email@example.com"

# ตั้งค่า editor เริ่มต้น (เลือก 1 อัน)
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim
git config --global core.editor "nano"         # Nano

# ตรวจสอบการตั้งค่า
git config --list
```

### การตั้งค่า SSH Key (แนะนำ)

```bash
# สร้าง SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# เริ่ม ssh-agent
eval "$(ssh-agent -s)"

# เพิ่ม SSH key
ssh-add ~/.ssh/id_ed25519

# แสดง public key เพื่อเพิ่มใน GitHub
cat ~/.ssh/id_ed25519.pub
```

## คำสั่งพื้นฐาน

### เริ่มต้น Repository

```bash
# สร้าง repository ใหม่
git init

# หรือ clone จาก remote
git clone https://github.com/username/repository.git
git clone git@github.com:username/repository.git  # ใช้ SSH
```

### ตรวจสอบสถานะ

```bash
# ดูสถานะไฟล์
git status

# ดูความแตกต่างของไฟล์
git diff
git diff --staged  # ดูไฟล์ที่ staged แล้ว

# ดูประวัติ commit
git log
git log --oneline  # แสดงแบบย่อ
git log --graph    # แสดงเป็น graph
```

### การเพิ่มและ Commit ไฟล์

```bash
# เพิ่มไฟล์เข้า staging area
git add filename.txt        # เพิ่มไฟล์เดียว
git add .                   # เพิ่มทุกไฟล์
git add *.js               # เพิ่มไฟล์ .js ทั้งหมด

# ลบไฟล์ออกจาก staging area
git reset filename.txt
git reset                  # ลบทุกไฟล์

# Commit การเปลี่ยนแปลง
git commit -m "ข้อความอธิบายการเปลี่ยนแปลง"

# เพิ่มและ commit ในคำสั่งเดียว (เฉพาะไฟล์ที่ tracked แล้ว)
git commit -am "ข้อความ commit"
```

## การทำงานกับ Repository

### การเชื่อมต่อกับ Remote Repository

```bash
# เพิ่ม remote repository
git remote add origin https://github.com/username/repository.git

# ดู remote ที่เชื่อมต่อ
git remote -v

# เปลี่ยน URL ของ remote
git remote set-url origin git@github.com:username/repository.git
```

### การ Push และ Pull

```bash
# Push ไปยัง remote repository
git push origin main
git push -u origin main  # -u เพื่อตั้งค่า upstream

# Pull จาก remote repository
git pull origin main
git pull  # ถ้าตั้ง upstream แล้ว

# Fetch ข้อมูลโดยไม่ merge
git fetch origin
```

## Branching และ Merging

### การจัดการ Branch

```bash
# ดู branch ทั้งหมด
git branch
git branch -a  # รวม remote branch

# สร้าง branch ใหม่
git branch feature-login
git checkout -b feature-login  # สร้างและเปลี่ยนไปใช้

# เปลี่ยน branch
git checkout main
git switch main  # คำสั่งใหม่

# เปลี่ยนชื่อ branch
git branch -m old-name new-name

# ลบ branch
git branch -d feature-login     # ลบ branch ที่ merge แล้ว
git branch -D feature-login     # บังคับลบ
```

### การ Merge

```bash
# Merge branch เข้ามาใน current branch
git merge feature-login

# Merge แบบ no-fast-forward (สร้าง merge commit เสมอ)
git merge --no-ff feature-login

# ยกเลิก merge ถ้ามี conflict
git merge --abort
```

### การแก้ไข Merge Conflict

เมื่อเกิด conflict:

1. เปิดไฟล์ที่มี conflict
2. แก้ไข conflict markers:

   ```text
   <<<<<<< HEAD
   โค้ดจาก branch ปัจจุบัน
   =======
   โค้ดจาก branch ที่ merge เข้ามา
   >>>>>>> feature-branch
   ```

3. เลือกโค้ดที่ต้องการหรือรวมทั้งสอง
4. ลบ conflict markers ออก
5. Add และ commit ไฟล์

```bash
git add filename.txt
git commit -m "แก้ไข merge conflict"
```

## การทำงานร่วมกับทีม

### Workflow พื้นฐาน

1. **Clone repository**

   ```bash
   git clone https://github.com/team/project.git
   ```

2. **สร้าง branch สำหรับ feature ใหม่**

   ```bash
   git checkout -b feature/user-authentication
   ```

3. **พัฒนาและ commit**

   ```bash
   git add .
   git commit -m "เพิ่มระบบ login"
   ```

4. **Push branch ขึ้น remote**

   ```bash
   git push origin feature/user-authentication
   ```

5. **สร้าง Pull Request/Merge Request**

   - ผ่าน GitHub, GitLab หรือ platform อื่น

6. **อัพเดท main branch**
   ```bash
   git checkout main
   git pull origin main
   ```

### การ Rebase

```bash
# Rebase current branch ด้วย main
git rebase main

# Interactive rebase (แก้ไข commit history)
git rebase -i HEAD~3  # 3 commit ล่าสุด

# ยกเลิก rebase
git rebase --abort

# ดำเนินการต่อหลังแก้ conflict
git rebase --continue
```

## คำสั่งที่ใช้บ่อย

### การยกเลิกการเปลี่ยนแปลง

```bash
# ยกเลิกการเปลี่ยนแปลงในไฟล์ (ยังไม่ add)
git checkout -- filename.txt
git restore filename.txt  # คำสั่งใหม่

# ยกเลิกการ add (unstage)
git reset filename.txt
git restore --staged filename.txt  # คำสั่งใหม่

# ยกเลิก commit ล่าสุด (เก็บการเปลี่ยนแปลง)
git reset --soft HEAD~1

# ยกเลิก commit ล่าสุด (ลบการเปลี่ยนแปลง)
git reset --hard HEAD~1
```

### การดูประวัติและค้นหา

```bash
# ดูประวัติของไฟล์
git log filename.txt

# ค้นหา commit ที่มีคำว่า "bug"
git log --grep="bug"

# ดูใครแก้ไขแต่ละบรรทัดในไฟล์
git blame filename.txt

# ค้นหาเมื่อไหร่ที่ข้อความถูกเพิ่มหรือลบ
git log -S "search text"
```

### การจัดการ Stash

```bash
# เก็บการเปลี่ยนแปลงชั่วคราว
git stash
git stash push -m "work in progress"

# ดู stash ทั้งหมด
git stash list

# นำ stash กลับมาใช้
git stash pop           # นำมาใช้และลบออกจาก stash
git stash apply         # นำมาใช้โดยไม่ลบจาก stash
git stash apply stash@{1}  # ระบุ stash เฉพาะ

# ลบ stash
git stash drop
git stash clear  # ลบทั้งหมด
```

## เทคนิคและ Tips

### Alias ที่มีประโยชน์

```bash
# ตั้งค่า alias
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# alias สำหรับ log ที่สวยงาม
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### .gitignore

สร้างไฟล์ `.gitignore` เพื่อไม่ติดตามไฟล์ที่ไม่ต้องการ:

```gitignore
# Node.js
node_modules/
npm-debug.log*
.env

# Python
__pycache__/
*.pyc
.venv/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Build files
dist/
build/
*.log
```

### คำสั่งขั้นสูง

```bash
# แสดงการเปลี่ยนแปลงแบบสรุป
git diff --stat

# ดู commit ที่ยังไม่ push
git log origin/main..HEAD

# ดู commit ที่อยู่ใน branch อื่นแต่ไม่อยู่ใน current branch
git log main..feature-branch

# สร้าง patch file
git format-patch -1 HEAD

# นำ patch มาใช้
git apply patch-file.patch

# ดูขนาดของ repository
git count-objects -vH

# ทำความสะอาด repository
git gc
git prune
```

### การแก้ไขปัญหาที่พบบ่อย

#### 1. แก้ไข commit message ล่าสุด

```bash
git commit --amend -m "ข้อความใหม่"
```

#### 2. เพิ่มไฟล์ใน commit ล่าสุด

```bash
git add forgotten-file.txt
git commit --amend --no-edit
```

#### 3. แก้ไข author ของ commit

```bash
git commit --amend --author="ชื่อใหม่ <email@example.com>"
```

#### 4. ลบไฟล์ที่ถูก track แล้วออกจาก Git

```bash
git rm --cached filename.txt
git commit -m "ลบไฟล์ออกจาก Git"
```

#### 5. เปลี่ยน remote URL

```bash
git remote set-url origin https://new-url.git
```

## สรุป

Git เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการโค้ด การเรียนรู้การใช้ Git อย่างถูกต้องจะช่วยให้:

- ทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพ
- ติดตามการเปลี่ยนแปลงของโปรเจกต์
- กู้คืนโค้ดเมื่อเกิดปัญหา
- พัฒนา feature ใหม่โดยไม่กระทบโค้ดหลัก

### แหล่งเรียนรู้เพิ่มเติม

- [Pro Git Book](https://git-scm.com/book/th)
- [GitHub Learning Lab](https://lab.github.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Learn Git Branching](https://learngitbranching.js.org/?locale=th)

---

อัพเดทล่าสุด: กันยายน 2025
