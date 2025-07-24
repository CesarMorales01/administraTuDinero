<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $role1= Role::create(['name'=> 'Administrador']);
        $role2= Role::create(['name'=> 'Superusuario']);
        $role3= Role::create(['name'=> 'Usuario']);

        //Permisos que tienen todos los roles.
        Permission::create(['name'=>'ingresar-abono'])->assignRole([$role2, $role3]);
        Permission::create(['name'=>'ingresar-prest'])->assignRole([$role2, $role3]);
        Permission::create(['name'=>'ingresar-cliente'])->assignRole([$role2, $role3]);

        //Permisos que tienen los roles de superusuario y administrador.
        Permission::create(['name'=>'editar-cliente'])->assignRole([$role2]);
        Permission::create(['name'=>'borrar-caja'])->assignRole([$role2]);
        Permission::create(['name'=>'ver-gastos'])->assignRole([$role2]);
        Permission::create(['name'=>'guardar-historial'])->assignRole([$role2]);
        Permission::create(['name'=>'ver-graficos-informes'])->assignRole([$role2]);
        Permission::create(['name'=>'borrar-listas'])->assignRole([$role2]);

        //Permisos que solo tiene el administrador.
        Permission::create(['name'=>'editar-prest']);
        Permission::create(['name'=>'eliminar-prest']);
        Permission::create(['name'=>'editar-usuarios']);
        Permission::create(['name'=>'editar-carteras']);

        //Rol administrador tiene todos los permisos.
        $role1->givePermissionTo(Permission::all());

        $user= User::create([
            // Poner el mismo nombre que en usuarios para no generar confusion.
            'name'=>'Cesar_CPU',
            'email'=>'cezar_mh86@hotmail.com',
            // se debe poner la misma contraseña que en usuarios para validar inicio de sesion en sistema antiguo.
            'password'=> Hash::make('0829'),
            'id_asesores'=>'1'
        ]);
        $user->assignRole('Administrador');

        $user0= User::create([
            'name'=>'Juli',
            'email'=>'leidyjuliana.gg@gmail.com',
            'password'=> Hash::make('1098683252'),
            'id_asesores'=>'78'
        ]);
        $user0->assignRole('Superusuario');

        $user1= User::create([
            'name'=>'Adrian_Alfonso',
            'email'=>'cezarmh86@gmail.com',
            'password'=> Hash::make('Adrian_Alfonso'),
            'id_asesores'=>'75'
        ]);
        $user1->assignRole('Superusuario');

        $user2= User::create([
            'name'=>'Adrian H',
            'email'=>'adrian080513@gmail.com',
            'password'=> Hash::make('helmusadrian'),
            'id_asesores'=>'76'
        ]);
        $user2->assignRole('Usuario');
    }
}
