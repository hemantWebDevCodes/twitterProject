<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_lists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('listBg_img')->nullable();
            $table->string('cropImg')->nullable();
            $table->longText('description')->nullable();
            $table->string('listType')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_lists');
    }
};
