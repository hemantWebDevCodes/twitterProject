<?php

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Broadcast; 

Broadcast::channel('twitChat.{chatId}', function ($user, $chatId) {
    return Auth::check();
});

