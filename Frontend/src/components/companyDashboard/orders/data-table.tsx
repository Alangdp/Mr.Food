import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Menubar,
  MenubarMenu,
  MenubarContent,
  MenubarItem,
} from '@/components/ui/menubar'
import { HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [filter, setFilter] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterDate, setFilterDate] = useState('')

  return (
    <>
      <div className="h-12 rounded shadow-df w-full flex items-center">
        <Input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="shadow-df w-60 m-2"
          Icon={MagnifyingGlassIcon}
          iconAction={() => console.log('TEste')}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Button variant={'ghost'}>Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setFilterStatus('PENDING')}
              className="flex items-center py-2 bg-transparent"
            >
              Pendente
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus('PREPARING')}
              className="flex items-center py-2 bg-transparent"
            >
              Em preparo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus('DELIVERED')}
              className="flex items-center py-2 bg-transparent"
            >
              Entregue
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus('READY')}
              className="flex items-center py-2 bg-transparent"
            >
              Pronto
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus('CANCELED')}
              className="flex items-center py-2 bg-transparent"
            >
              Cancelado
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus('')}
              className="flex items-center py-2 bg-transparent"
            >
              Todos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Button variant={'ghost'}>Data</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setFilterDate('Hoje')}
              className="flex items-center py-2 bg-transparent"
            >
              Hoje
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterDate('Ontem')}
              className="flex items-center py-2 bg-transparent"
            >
              Ontem
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterDate('Semana')}
              className="flex items-center py-2 bg-transparent"
            >
              Semana
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterDate('Mês')}
              className="flex items-center py-2 bg-transparent"
            >
              Mês
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterDate('Ano')}
              className="flex items-center py-2 bg-transparent"
            >
              Ano
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterDate('')}
              className="flex items-center py-2 bg-transparent"
            >
              Todos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border flex flex-col">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => {
                const status = row.getValue('status')
                const bgColor =
                  status === 'Pendente'
                    ? 'bg-yellow-100'
                    : status === 'Em preparo'
                      ? 'bg-blue-100'
                      : status === 'Finalizado'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                if (filterStatus && status !== filterStatus) {
                  return null
                }

                if (filter) {
                  const search = filter.toLowerCase()
                  const isMatch = row.getVisibleCells().some(cell => {
                    const cellValue = cell.getValue()
                    return String(cellValue).toLowerCase().includes(search)
                  })

                  if (!isMatch) {
                    return null
                  }
                }

                if (filterDate) {
                  const date = row.getValue('createdAt') as Date
                  const today = new Date()
                  const yesterday = new Date(today)
                  yesterday.setDate(yesterday.getDate() - 1)
                  const week = new Date(today)
                  week.setDate(week.getDate() - 7)
                  const month = new Date(today)
                  month.setMonth(month.getMonth() - 1)
                  const year = new Date(today)
                  year.setFullYear(year.getFullYear() - 1)

                  const dateFilter = filterDate.toLowerCase()

                  const dateClean = new Date(date)
                  dateClean.setHours(0, 0, 0, 0)

                  const isSameDate = (date1: Date, date2: Date): boolean => {
                    return (
                      date1.getFullYear() === date2.getFullYear() &&
                      date1.getMonth() === date2.getMonth() &&
                      date1.getDate() === date2.getDate()
                    )
                  }

                  if (dateFilter === 'hoje' && !isSameDate(dateClean, today)) {
                    return null
                  }
                  if (
                    dateFilter === 'ontem' &&
                    !isSameDate(dateClean, yesterday)
                  ) {
                    return null
                  }
                  if (dateFilter === 'semana' && dateClean < week) {
                    return null
                  }
                  if (dateFilter === 'mês' && dateClean < month) {
                    return null
                  }
                  if (dateFilter === 'ano' && dateClean < year) {
                    return null
                  }
                }

                return (
                  <TableRow
                    className={bgColor}
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem pedidos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
