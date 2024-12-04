import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
/* import { Active, DataRef, Over } from '@dnd-kit/core' */

/* import { ColumnDragData } from '@/components/kanban/board-column'
import { TaskDragData } from '@/components/kanban/task-card' */

/* type DraggableData = ColumnDragData | TaskDragData
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractYouTubeID(url: string) {
  const regExp =
    /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\/videos\/|watch\?v%3D|watch\?v%3D|watch\?list=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}
/* 
export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>
} {
  if (!entry) {
    return false
  }

  const data = entry.data.current

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true
  }

  return false
}
 */

// Função para formatar o CPF
export function formatCPF(value: string) {
  return value
    .replace(/\D/g, '') // Remove todos os caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Adiciona o hífen
    .slice(0, 14) // Limita o tamanho do CPF
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: 'accurate' | 'normal'
  } = {},
) {
  const { decimals = 0, sizeType = 'normal' } = opts

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytes')
      : (sizes[i] ?? 'Bytes')
  }`
}
