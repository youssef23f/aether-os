import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * دالة لتجميع ملفات المشروع وتصديرها كملف ZIP مضغوط
 * @param {Object} files - كائن يحتوي على اسم الملف كمفتاح والمحتوى كقيمة { 'index.html': '...', 'styles.css': '...' }
 * @param {string} projectName - اسم الملف الناتج عند التحميل
 */
export const exportProjectToZip = async (files, projectName = "AETHER-Project") => {
  try {
    const zip = new JSZip();

    // 1. إضافة كل ملف موجود في الـ State إلى ملف الـ ZIP
    Object.keys(files).forEach((fileName) => {
      if (files[fileName]) {
        zip.file(fileName, files[fileName]);
      }
    });

    // 2. توليد الملف المضغوط بصيغة Blob
    const content = await zip.generateAsync({ type: 'blob' });

    // 3. تنزيل الملف على جهاز المستخدم
    saveAs(content, `${projectName}.zip`);
  } catch (error) {
    console.error("خطأ أثناء تصدير المشروع:", error);
    alert("حدث خطأ أثناء محاولة تصدير الملفات.");
  }
};