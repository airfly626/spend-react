<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AppController extends AbstractController
{
    #[Route('/')]
    public function homepage(): Response
    {
        // return new Response('<strong>Starshop</strong>: your monopoly-busting !');
        return $this->render('base.html.twig');
    }

    #[Route('/{reactRouting}', name: 'app_home', requirements: ['reactRouting' => '^(?!api|_profiler|_wdt).+'], defaults: ['reactRouting' => null])]
    public function index(): Response
    {
        return $this->render('base.html.twig'); // 或是你載入 React 的 Twig 範本
    }
}
