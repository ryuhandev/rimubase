const os = require("os");
const fs = require("fs");

// Fungsi untuk mendapatkan penggunaan CPU
function getCpuUsage() {
  return new Promise((resolve) => {
    const startUsage = os.cpus().map((cpu) => cpu.times);
    setTimeout(() => {
      const endUsage = os.cpus().map((cpu) => cpu.times);
      const idleDiff = endUsage.reduce((acc, cpu, idx) => acc + (cpu.idle - startUsage[idx].idle), 0);
      const totalDiff = endUsage.reduce(
        (acc, cpu, idx) =>
          acc +
          (Object.values(cpu).reduce((a, b) => a + b) -
            Object.values(startUsage[idx]).reduce((a, b) => a + b)),
        0
      );
      resolve(((1 - idleDiff / totalDiff) * 100).toFixed(1));
    }, 100);
  });
}

// Fungsi untuk mendapatkan penggunaan RAM
function getRamUsage() {
  const totalMemory = os.totalmem();
  const usedMemory = totalMemory - os.freemem();
  const percentage = ((usedMemory / totalMemory) * 100).toFixed(1);
  return {
    totalMemory: (totalMemory / (1024 ** 3)).toFixed(2), // GB
    usedMemory: (usedMemory / (1024 ** 3)).toFixed(2), // GB
    percentage,
  };
}

// Fungsi untuk mendapatkan penggunaan storage
function getStorageUsage() {
  const totalStorage = 128671.82; // Sesuaikan dengan data dari gambar
  const usedStorage = 24278.45; // Sesuai data dari gambar
  const percentage = ((usedStorage / totalStorage) * 100).toFixed(1);
  return { totalStorage, usedStorage, percentage };
}

// Fungsi utama untuk mendapatkan data sistem
async function getSystemUsage() {
  const cpuUsage = await getCpuUsage();
  const ramUsage = getRamUsage();
  const storageUsage = getStorageUsage();

  return {
    CPU: `[${"■".repeat(cpuUsage / 10)}${"□".repeat(10 - cpuUsage / 10)}] ${cpuUsage}%`,
    RAM: `[${"■".repeat(ramUsage.percentage / 10)}${"□".repeat(10 - ramUsage.percentage / 10)}] ${ramUsage.percentage}%`,
    STORAGE: `[${"■".repeat(storageUsage.percentage / 10)}${"□".repeat(10 - storageUsage.percentage / 10)}] ${storageUsage.percentage}%`,
    details: {
      totalStorage: `${storageUsage.totalStorage} GB`,
      usedStorage: `${storageUsage.usedStorage} GB`,
    },
  };
}

module.exports = { getCpuUsage, getRamUsage, getStorageUsage, getSystemUsage };