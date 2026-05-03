'use client';

import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface FiltersProps {
  onSearch: (text: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function Filter({ onSearch, onCategoryChange }: FiltersProps) {
  return (
    <div className='flex flex-col md:flex-row gap-4 mb-8'>
      {/* Input de búsqueda por contenido */}
      <div className='relative flex-1'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Buscar...'
          className='pl-10'
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      {/* Select de búsqueda por categoría */}
      <Select onValueChange={onCategoryChange} defaultValue='all'>
        <SelectTrigger className='w-full md:w-100'>
          <SelectValue placeholder='Todas las categorías' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>
            Todas las categorías
          </SelectItem>
          <SelectItem value='electrónica'>
            Electrónica
          </SelectItem>
          <SelectItem value='joyería'>
            Joyería
          </SelectItem>
          <SelectItem value='ropa de hombre'>
            Ropa de hombre
          </SelectItem>
          <SelectItem value='ropa de mujer'>
            Ropa de mujer
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}