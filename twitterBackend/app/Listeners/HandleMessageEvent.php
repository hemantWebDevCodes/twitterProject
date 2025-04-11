<?php

namespace App\Listeners;

use App\Events\MessageEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Services\MessageService; // For example, a service class

class HandleMessageEvent
{
    protected $messageService;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        $this->messageService = $messageService;
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
    }
}
