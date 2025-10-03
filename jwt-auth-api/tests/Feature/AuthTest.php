<?php
namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    protected function setUp(): void
    {
        parent::setUp(); // always call parent

        // Seed your roles and permissions
        $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    }

    public function test_user_can_be_assigned_role()
    {
        $user = \App\Models\User::factory()->create();
        $user->assignRole('user'); // now it works

        $this->assertTrue($user->hasRole('user'));
    }

    public function test_register()
    {
        $response = $this->postJson('/api/auth/register',[
            'name'=>'Test User5',
            'email'=>'test5@example.com',
            'password'=>'password12',
            'password_confirmation'=>'password12'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['user','message']);
    }

    public function test_login()
    {
        $user = User::factory()->create(['password'=>bcrypt('password')]);

        $response = $this->postJson('/api/auth/login',[
            'email'=>$user->email,
            'password'=>'password'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['access_token']);
    }
}
