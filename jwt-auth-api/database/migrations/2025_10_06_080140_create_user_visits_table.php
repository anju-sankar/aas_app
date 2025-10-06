<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('page'); // Page visited
            $table->string('ip')->nullable(); // Optional IP tracking
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_visits');
    }
};