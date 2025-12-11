# Student Management

A project built with **TypeScript** and **TailwindCSS**.  
Project structure follows a framework-based convention.  
Goal-standardization: DRY (Don't Repeat Yourself).  
Do not gain the goal-standardization because the source code are not separated
=> Next-goal: Refactor base on DRY and SoC

## Tag-line Standardization

- Use LF instead of CRLF for line endings.
- Configure `.gitattributes` for automatic translation.

## Folder Structure

### ./build

Acts as the main entry point for outputs, similar to `App.tsx` in ReactJS or `layout.tsx` in Next.js.

### ./public

Stores project assets such as images, fonts, icons, etc.

### ./src

Contains source code.  
`main.ts` serves as the intermediary linking sources in the `src` folder with `index.html`.

#### ./constants

Stores constant values used throughout the application (e.g., storage keys for localStorage).

#### ./controllers

Contains business logic controllers that handle user interactions and data flow.

##### ../studentForm.controllers.ts

- Handles form submission for adding new students
- Manages form validation and error handling
- Auto-calculates student classification based on scores
- Provides `resetForm()` method to clear form inputs
- **Important**: Only increments counter when ADD operation succeeds

##### ../studentRow.controllers.ts

- Implements **Event Delegation** for handling row clicks
- Manages student selection and form population
- Handles UPDATE and DELETE operations
- **Key feature**: Single event listener on container handles all row interactions

#### ./models

- Automatically generates student id in this class
- Creates separated interfaces for fixed/auto-generate fields and input fields
- Check the case whether maSV (student id) exists -> Generate id if not

##### ./student.models.ts

- Defines `SV` interface and `SinhVien` class
- `maSV` is readonly to prevent modification after creation
- Includes `fromObject()` static method to reconstruct objects from localStorage
- Implements classification logic: Giỏi (≥8.5), Khá (≥6.5), Trung bình (≥5), Yếu (<5)

#### ./services

Contains data service layer for CRUD operations and storage management.

##### ../data.services.ts

- **All CRUD operations are asynchronous** (return Promise)
- Simulates API calls with 1.5s delay
- Implements `themSV()`, `capNhatSV()`, `xoaSV()` methods
- **Critical feature**: `xoaSV()` automatically reindexes all student IDs after deletion
- Ensures student IDs remain sequential (SV01, SV02, SV03...) without gaps

##### ../localStorageData.services.ts

- Wrapper class for localStorage operations
- Handles JSON serialization/deserialization
- Provides type-safe methods for storing student list and string values

#### ./ui

Contains rendering source code based on components

##### ../studentList.ui.ts

- Renders student table with thead/tbody structure
- Applies color coding to classifications (Giỏi=green, Khá=blue, TB=yellow, Yếu=red)
- Displays empty state message when no students exist
- Each row has `data-id` attribute for Event Delegation

#### ./utils

Contains utilities or helpers code

##### ../generateMaSV.utils.ts

- Some string methods have not been match with the version of EcmaScript (e.g. ES5, ES6, etc.) -> Checks the "target" in tsconfig.json to prevent the tackle
- Initialize a common generator used for overall system -> Prevent the meet to duplicate errors once loading page
- **Note**: Keep original implementation as designed - do not modify counter logic

## Key Features Implemented

### 1. Context Management (this binding)

**Problem**: `this` becomes `undefined` in event handler callbacks

**Solution**: Use `.bind(this)` to preserve context

```typescript
this.tableContainer.addEventListener("click", this.handleRowClick);
this.tableContainer.addEventListener("click", this.handleRowClick.bind(this));
```

**Locations**: All event handlers in both controllers use `.bind(this)`

### 2. Asynchronous Operations with Promise

**Location**: `src/services/data.services.ts`

All CRUD operations return Promise and simulate API delay:  
Use Promise<void> as an object that not return value - Type of TypeScript

```typescript
public async themSV(sv: SinhVien): Promise<void> {
  await simulateAPIDelay(1500); // Simulate API call
  // ... perform operation
}
```

**Usage**: Controllers use `async/await` with `try...catch`:

```typescript
try {
  this.showLoading("Processing...");
  await this.danhSach.themSV(sv);
  this.hideLoading();
  alert("Success!");
} catch (err: any) {
  this.hideLoading();
  alert(`Error: ${err.message}`);
}
```

### 3. Local Storage Integration

**Location**: `src/services/localStorageData.services.ts`

Stores three types of data:

- `danhSachSinhVien`: Array of students (persists after page reload)
- `counter`: Current counter value for auto-generating student IDs
- `selectedMaSV`: Currently selected student (optional)

### 4. Auto-Reindex After Deletion

**Location**: `src/services/data.services.ts` - `reindexDanhSach()` method

**Problem**: After deleting a student, IDs have gaps (SV01, SV02, SV04, SV05)

**Solution**: Automatically reindex all students sequentially

```
Before delete: SV01, SV02, SV03, SV04
Delete SV02
After delete:  SV01, SV02, SV03 (SV03 and SV04 moved up)
Counter updated to: 4 (length + 1)
```

## Common Issues and Solutions

### Issue 1: Form not clearing after Update/Delete

**Symptom**: After updating or deleting a student, form still shows old data and maSV doesn't reset.

**Root Cause**:

- Update/Delete operations were calling `resetForm()` which was incrementing counter
- Counter should only increment on ADD operation

**Solution**:

```typescript
// In studentForm.controllers.ts
public resetForm(): void {
  // Clear inputs
  this.formDataReset.forEach(element => {
    if (element instanceof HTMLInputElement) element.value = "";
    else if (element instanceof HTMLSpanElement) element.innerText = "";
  });

  // Only prepareNextMaSV (DO NOT increment counter)
  this.prepareNextMaSV();
}

// Counter only increments in handleSubmit (ADD operation)
```

### Issue 2: Counter incrementing on Update/Delete

**Symptom**:

- After updating SV01, next add shows SV03 instead of SV02
- Counter increases unnecessarily on non-ADD operations

**Root Cause**: `resetForm()` was incrementing counter on every call.

**Solution**: Separate logic for ADD vs UPDATE/DELETE

```typescript
// ADD: increment counter after success
await this.danhSach.themSV(sv);
increaseCounter(); // Only here
this.prepareNextMaSV();

// UPDATE: just reset form (no counter increment)
await this.danhSach.capNhatSV(maSV, data);
this.formController.resetForm(); // No increment here
```

### Issue 3: Student ID gaps after deletion

**Symptom**: After deleting students, IDs are not sequential (SV01, SV03, SV05).

**Root Cause**: Deletion only removes student from array without reindexing.

**Solution**: Implement `reindexDanhSach()` method

```typescript
private reindexDanhSach(): void {
  // Reassign sequential IDs
  this.danhSach = this.danhSach.map((sv, index) => {
    const newMaSV = `SV${(index + 1).toString().padStart(2, "0")}`;
    return new SinhVien(newMaSV, sv.tenSV, sv.diemToan, sv.diemVan);
  });

  // Update counter to match current length + 1
  const newCounter = this.danhSach.length + 1;
  localStorageData.setString(STORAGE_KEYS.COUNTER_MA_SV, newCounter.toString());

  localStorageData.setSVList(STORAGE_KEYS.DANH_SACH_SV, this.danhSach);
}

// Call reindexDanhSach() after deletion
public async xoaSV(maSV: string): Promise<void> {
  await simulateAPIDelay();
  this.danhSach = this.danhSach.filter(sv => sv.maSV !== maSV);
  this.reindexDanhSach(); // ✅ Reindex after delete
}
```

### Issue 4: Event Delegation target selection

**Symptom**: Click only works on specific parts of the row, not the entire row.

**Root Cause**: Event target might be a `<td>` or text node, not the `<tr>`.

**Solution**: Use `closest()` to find parent row

```typescript
private handleRowClick(e: Event): void {
  const target = e.target as HTMLElement;
  const row = target.closest('tr[data-id]') as HTMLTableRowElement; // ✅

  if (!row) return; // Not a valid row

  const maSV = row.dataset.id;
  // ... handle click
}
```

### Issue 5: Loading indicator not showing

**Symptom**: Operations feel instant despite 1.5s delay.

**Root Cause**: Loading overlay not properly appended or removed.

**Solution**: Create/remove loading overlay properly

```typescript
private showLoading(message: string): void {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading-overlay";
  loadingDiv.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  loadingDiv.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
      <p class="text-lg font-semibold text-gray-800">${message}</p>
    </div>
  `;
  document.body.appendChild(loadingDiv); // ✅ Append to body
}

private hideLoading(): void {
  const loadingDiv = document.getElementById("loading-overlay");
  if (loadingDiv) {
    loadingDiv.remove();
  }
}
```

## Flow Summary

### Add Student Flow

1. User fills form (maSV auto-displayed)
2. Click "Thêm" button
3. Validation checks
4. Show loading (1.5s)
5. Add to list
6. **Increment counter** (SV01 → SV02)
7. Clear form and display next maSV
8. Render updated table

### Update Student Flow

1. User clicks row in table (Event Delegation)
2. Row highlights, form populates with data
3. User modifies data in form
4. Click "Sửa" button
5. Validation checks
6. Show loading (1.5s)
7. Update student in list
8. **Counter NOT incremented**
9. Clear form, display current next maSV
10. Render updated table

### Delete Student Flow

1. User clicks row in table
2. Row highlights, form populates
3. Click "Xóa" button
4. Confirm deletion
5. Show loading (1.5s)
6. Remove from list
7. **Reindex all students** (SV01, SV02, SV03...)
8. **Update counter** to length + 1
9. Clear form, display updated maSV
10. Render updated table

## Getting Started

```bash
# Install dependencies
npm install

# Run development build
npm run dev

# Build for production
npm run build
```

**Note**: This project demonstrates advanced TypeScript/JavaScript concepts including Event Delegation, Context Management, Closure, Async/Await, and Local Storage integration.
