<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home.index', methods: ['GET'])]
    public function index(Request $request, ProductRepository $repository): Response
    {
    
        $query = $request->query->get('q');

        if ($query) {
            // Utilisation du repository pour rechercher des produits
            $products = $repository->searchByName($query);
        } else {
            // Récupérer tous les produits
            $products = $repository->findAll();
        }

        return $this->render('pages/index.html.twig', [
            'products' => $products,
        ]);

    }


}
