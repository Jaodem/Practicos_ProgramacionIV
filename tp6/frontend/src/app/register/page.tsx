'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(formData);
      toast.success('Registro exitoso. Redireccionando al login...');

      setTimeout(() => {
        router.push('/login');
      }, 3000);
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <Card className='w-full max-w-md shadow-sm border-gray-200'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Crear cuenta
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>
                Nombre
              </Label>
              <Input
                id='name'
                placeholder='Ingresá tu nombre'
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>
                Correo
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='Ingresá tu correo'
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>
                Contraseña
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Ingresá tu contraseña'
                required
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button type='submit' className='w-full bg-[#0f172a] cursor-pointer'>
              {loading ? 'Procesando...' : 'Registrarme'}
            </Button>
            <p className='text-sm text-muted-foreground self-start'>
              ¿Ya tienes cuenta? <Link href="/login" className="text-black font-semibold hover:underline">Inicia sesión</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}