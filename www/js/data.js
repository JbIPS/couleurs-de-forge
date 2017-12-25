window.structure = [
{
  "class": "bkg2",
  "id": "atelier",
  "spots": [
    {
      "id": "atelier-trou",
      "type": "movie",
      "classes": "smith",
      "content": "03_Trou_renfle_v2.mp4",
      "position": {
        "x": 272,
        "y": 232
      }
    },
    {
      "id": "atelier-damas",
      "type": "movie",
      "classes": "epv",
      "content": "Soudure_Damas.mp4",
      "position": {
        "x": 757,
        "y": 109
      }
    },
    {
      "id": "atelier-pilon",
      "type": "movie",
      "classes": "smith",
      "content": "Etirement_pilon.mp4",
      "position": {
        "x": 640,
        "y": 140
      }
    },
    {
      "id": "atelier-fa3",
      "type": "movie",
      "classes": "smith",
      "content": "Frappe_a_trois.mp4",
      "position": {
        "x": 386,
        "y": 300
      }
    },
    {
      "id": "atelier-1",
      "unlock": ["atelier-2"],
      "type": "text",
      "locked": false,
      "classes": "knife",
      "content": {
        "text": "# Forge de la lame\n\nLe forgeron va choisir un morceau d’acier suffisant pour pouvoir former la lame et le manche.\n\nIl doit travailler l’acier quand il est chaud. Après l’avoir mis à chauffer dans le feu il va étirer la matière avec son marteau pour obtenir un rectangle de quelques millimètres d’épaisseur.\n\nIl fait la pointe puis façonne la forme de la lame et ébauche les émoutures, étire l’arrière de la lame sur lequel sera fixer le manche.\n\nIl doit toujours vérifier que la lame est bien droite et la redresser régulièrement.\n\nQuand il est satisfait du résultat il appose son poinçon ! Il faudra entre 30 minutes et quelque fois plus d’une heure pour façonner une bonne lame à partir d’un lingot d’acier."
      },
      "position": {
        "x": 100,
        "y": 450
      }
    },
    {
      "id": "atelier-2",
      "unlock": ["atelier-3"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Normalisation\n\nPour que la lame forgée devienne très tranchante et ne se torde pas le forgeron va lui faire subir des traitements thermiques.\n\nLe fer possède la faculté de modifier sa structure cristalline en fonction de la température.\n\n**Le premier traitement thermique est la normalisation**\n\nLorsque la lame est forgée l’acier a subi des chauffes et des chocs. A l’intérieur les grains de l’acier sont de différentes tailles et plus ou moins éloignés entre eux. Pour homogénéiser l’ensemble des cristaux le forgeron va réaliser des normalisations. Pour cela il va par 3 fois chauffer la lame à 750°c et la refroidir très vite."
      },
      "position": {
        "x": 265,
        "y": 450
      }
    },
    {
      "id": "atelier-3",
      "unlock": ["atelier-4"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Recuit de détension\n\nMaintenant que l’acier est homogène et avant de travailler la lame par abrasion le forgeron va « détendre » l’acier en le montant doucement en température pour lui enlever tous les « stress » subit par le marteau. C’est le recuit de détension : la lame est montée à 760°c et refroidie très lentement dans le feu qui s’éteint le soir, et laissée jusqu’au matin . L’acier est ainsi plus mou et plus facile à travailler à la lime ou les bandes abrasives."
      },
      "position": {
        "x": 647,
        "y": 245
      }
    },
    {
      "id": "atelier-4",
      "unlock": ["atelier-5"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Travail à l’abrasion\n\nQuand le coutelier a fini de forger sa lame, il a ébauché l’émouture, c’est-à-dire la partie de la lame qui s’amincit pour former le tranchant. Pour obtenir le tranchant il va enlever de la matière grâce à des bandes abrasives rotatives. On appelle ces machines des Back-stand.\n\nRégulièrement le coutelier refroidit la lame pour éviter des surchauffes à l’acier et à ces mains !\nIl existe différentes formes d’émoutures. La plus courante et la plus polyvalente est l’émouture droite. Les 2 côtés doivent être parfaitement symétriques.\n\nA la fin de l’émouturage le fil du tranchant doit être parfaitement centré. Il n’a pas encore la finesse finale pour éviter de le déformer lors de la trempe.\n\n+![emouture](img/emouture.png)"
      },
      "position": {
        "x": 905,
        "y": 384
      }
    },
    {
      "id": "atelier-5",
      "unlock": ["atelier-6"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Perçage\n\nSi le manche doit recevoir des plaquettes il faut percer la « semelle » pendant que le métal est tendre, sinon la perceuse aura beaucoup de mal à perforer le métal !"
      },
      "position": {
        "x": 1155,
        "y": 200
      }
    },
    {
      "id": "atelier-6",
      "unlock": ["atelier-7"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Guillochage\n\nLe guillochage est une technique qui permet d'embellir un couteau. Elle consiste à entailler le dos d'une lame pour y faire apparaître un motif. On utilise des limes.\n\nAprès le marteau, un peu de délicatesse !\n\nLes motifs peuvent être très variés :\n ![motifs](img/guillochage.jpg)"
      },
      "position": {
        "x": 1762,
        "y": 220
      }
    },
    {
      "id": "atelier-7",
      "unlock": ["atelier-8"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# La trempe\n\nLa lame est prête, il ne reste plus qu’à l’affûter. C’est à ce stade que le forgeron va  « tremper » la lame pour resserrer les cristallisations et le rendre très dur. Pour cela il va chauffer l’acier aux environs de 800 °c. Le forgeron sait que l’acier a atteint la température voulue quand la lame devient rouge cerise. Puis il va la refroidir rapidement en la trempant dans un bain d’huile.\n\nA ce stade la lame est très dure, si le forgeron la lâchait elle pourrait se casser comme du verre. Il est donc indispensable de l’assouplir.\n\nLes couleurs de trempe\n\nUne des plus connues est le rouge cerise, c’est celui qu’on utilise pour les aciers aux carbones\n\nIl correspond à 750°C ![750](img/cerise750.jpg) et le cerise clair 800°C ![800](img/cerise800.png)"
      },
      "position": {
        "x": 132,
        "y": 220
      }
    },
    {
      "id": "atelier-8",
      "unlock": ["atelier-9"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Le revenu\n\nJuste après la trempe la lame n’est pas utilisable, il faut l’assouplir pour qu’elle ne soit pas cassante. Le forgeron procède à un nouveau traitement thermique qui s’appelle le revenu. \n\nOn pose le dos de la lame sur un lingot d’acier chauffé au rouge, on amène le tranchant au jaune paille et le dos au bleu. On aura donc un acier dur sur le tranchant et plus souple sur le dos."
      },
      "position": {
        "x": 825,
        "y": 402
      }
    },
    {
      "id": "atelier-9",
      "unlock": ["atelier-10"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Le montage du manche\n\nLe montage en plate semelle consiste à utiliser le prolongement de la lame pour former le manche en l’épaississant avec des plaquettes.\n\nLe bois est bien sûr le plus utilisé mais on peut aussi les confectionner avec de la corne, de l’os, du bois de cervidé, des défenses de phacochères, des matériaux modernes comme les résines ou les bois stabilisés et même faire des montages avec plusieurs matières.\n\nIci aussi le forgeron -coutelier doit faire preuve de finesse pour ajuster parfaitement les plaquettes et les riveter sans les fendre !"
      },
      "position": {
        "x": 1401,
        "y": 221
      }
    },
    {
      "id": "atelier-10",
      "unlock": ["atelier-11"],
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Polissage\n\nPour obtenir une jolie finition sans rayures, le couteau est passé à la « frotte ».\n\nIl s’agit d’une polisseuse avec une roue en sisal puis en flanelle pour la dernière opération."
      },
      "position": {
        "x": 1095,
        "y": 230
      }
    },
    {
      "id": "atelier-11",
      "type": "text",
      "locked": true,
      "classes": "knife",
      "content": {
        "text": "# Aiguisage\n\nPour l’aiguisage retour au back-stand. Il faut utiliser des bandes avec des grains très fins et très durs. On utilise pour cela des grains de corindon, qui est le minéral le plus dur après le diamant. Le coutelier maintien le couteau avec un angle très précis pour former le fil du tranchant. "
      },
      "position": {
        "x": 235,
        "y": 200
      }
    },
  ]
},
  {
    "id": "forge",
    "spots": [
      {
        "id": "forge-1",
        "type": "text",
        "content": {
          "text": "Bienvenue chez Gofannon!",
          "sound": "intro.mp3"
        },
        "position": {
          "x": 235,
          "y": 200
        }
      }
    ]
  },
  {
    "id": "salle",
    "spots": [
      {
        "id": "salle-1",
        "type": "text",
        "content": {
          "text": "Bienvenue chez Couleurs de forge!",
          "sound": "intro.mp3"
        },
        "position": {
          "x": 235,
          "y": 200
        }
      }
    ]
  }
]
