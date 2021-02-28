const sample = [
    {
      "index": 0,
      "balance": "$1,975.80",
      "name": "Reva Hardy",
      "company": "ORGANICA",
      "email": "revahardy@organica.com",
      "phone": "+1 (822) 446-2909",
      "address": "467 Poplar Avenue, Dotsero, Texas, 4231"
    },
    {
      "index": 1,
      "balance": "$3,284.13",
      "name": "Lynne Sykes",
      "company": "APPLICA",
      "email": "lynnesykes@applica.com",
      "phone": "+1 (933) 449-3534",
      "address": "321 Elm Avenue, Healy, Wisconsin, 613"
    },
    {
      "index": 2,
      "balance": "$2,642.47",
      "name": "Joyner Mcclain",
      "company": "CORMORAN",
      "email": "joynermcclain@cormoran.com",
      "phone": "+1 (932) 568-3813",
      "address": "858 Eckford Street, Gouglersville, Massachusetts, 3246"
    },
    {
      "index": 3,
      "balance": "$1,924.87",
      "name": "Dominique Cooley",
      "company": "BUZZWORKS",
      "email": "dominiquecooley@buzzworks.com",
      "phone": "+1 (958) 581-2934",
      "address": "981 Logan Street, Fresno, Montana, 7878"
    },
    {
      "index": 4,
      "balance": "$1,562.62",
      "name": "Sabrina Torres",
      "company": "AFFLUEX",
      "email": "sabrinatorres@affluex.com",
      "phone": "+1 (908) 567-2529",
      "address": "617 Hewes Street, Orick, American Samoa, 578"
    },
    {
      "index": 5,
      "balance": "$3,427.77",
      "name": "Janet Bean",
      "company": "COLUMELLA",
      "email": "janetbean@columella.com",
      "phone": "+1 (916) 575-2470",
      "address": "810 Clermont Avenue, Ezel, Missouri, 7943"
    },
    {
      "index": 6,
      "balance": "$2,431.63",
      "name": "Araceli Pitts",
      "company": "ILLUMITY",
      "email": "aracelipitts@illumity.com",
      "phone": "+1 (925) 418-3728",
      "address": "989 Howard Avenue, Smeltertown, New Mexico, 4324"
    },
    {
      "index": 7,
      "balance": "$1,829.20",
      "name": "Holland Sims",
      "company": "KNOWLYSIS",
      "email": "hollandsims@knowlysis.com",
      "phone": "+1 (839) 412-3360",
      "address": "290 Scholes Street, Barronett, Federated States Of Micronesia, 4441"
    },
    {
      "index": 8,
      "balance": "$1,611.81",
      "name": "Mullins Alvarez",
      "company": "REVERSUS",
      "email": "mullinsalvarez@reversus.com",
      "phone": "+1 (876) 459-2782",
      "address": "745 Johnson Street, Yukon, Kansas, 6628"
    },
    {
      "index": 9,
      "balance": "$3,235.08",
      "name": "Leann Mcintyre",
      "company": "BESTO",
      "email": "leannmcintyre@besto.com",
      "phone": "+1 (809) 512-2611",
      "address": "376 Oak Street, Darrtown, Idaho, 7157"
    },
    {
      "index": 10,
      "balance": "$3,489.95",
      "name": "Jessie Goff",
      "company": "DAYCORE",
      "email": "jessiegoff@daycore.com",
      "phone": "+1 (970) 451-2670",
      "address": "640 Orient Avenue, Townsend, New Hampshire, 6073"
    },
    {
      "index": 11,
      "balance": "$2,776.40",
      "name": "Helene Glover",
      "company": "EXOSPACE",
      "email": "heleneglover@exospace.com",
      "phone": "+1 (813) 458-3900",
      "address": "689 Bulwer Place, Kersey, West Virginia, 9206"
    },
    {
      "index": 12,
      "balance": "$2,295.31",
      "name": "Abigail Guy",
      "company": "CENTURIA",
      "email": "abigailguy@centuria.com",
      "phone": "+1 (978) 509-2870",
      "address": "810 Woodside Avenue, Belfair, South Dakota, 4034"
    },
    {
      "index": 13,
      "balance": "$3,809.20",
      "name": "Beverley Guzman",
      "company": "ZENTRY",
      "email": "beverleyguzman@zentry.com",
      "phone": "+1 (991) 560-2143",
      "address": "775 Dahlgreen Place, Mansfield, Arizona, 2110"
    },
    {
      "index": 14,
      "balance": "$3,949.97",
      "name": "Chaney Moss",
      "company": "SLAMBDA",
      "email": "chaneymoss@slambda.com",
      "phone": "+1 (862) 495-3939",
      "address": "387 Juliana Place, Villarreal, Ohio, 6597"
    },
    {
      "index": 15,
      "balance": "$2,080.00",
      "name": "Lula Holt",
      "company": "ASIMILINE",
      "email": "lulaholt@asimiline.com",
      "phone": "+1 (989) 586-2354",
      "address": "371 Erskine Loop, Bennett, California, 3814"
    },
    {
      "index": 16,
      "balance": "$1,655.97",
      "name": "Velez Fowler",
      "company": "KAGGLE",
      "email": "velezfowler@kaggle.com",
      "phone": "+1 (875) 432-2636",
      "address": "221 Ryder Street, Westphalia, Iowa, 6895"
    },
    {
      "index": 17,
      "balance": "$2,135.74",
      "name": "Sylvia Ochoa",
      "company": "ACCEL",
      "email": "sylviaochoa@accel.com",
      "phone": "+1 (890) 418-2505",
      "address": "692 Vandalia Avenue, Wolcott, Alabama, 3331"
    },
    {
      "index": 18,
      "balance": "$3,918.53",
      "name": "Celina Langley",
      "company": "POWERNET",
      "email": "celinalangley@powernet.com",
      "phone": "+1 (985) 443-3721",
      "address": "660 Highland Avenue, Summerset, Nebraska, 1895"
    },
    {
      "index": 19,
      "balance": "$3,816.99",
      "name": "Clarice Mendoza",
      "company": "MATRIXITY",
      "email": "claricemendoza@matrixity.com",
      "phone": "+1 (878) 597-3888",
      "address": "500 Graham Avenue, Osmond, Connecticut, 9358"
    },
    {
      "index": 20,
      "balance": "$1,433.84",
      "name": "Cruz Savage",
      "company": "KIDSTOCK",
      "email": "cruzsavage@kidstock.com",
      "phone": "+1 (842) 517-3051",
      "address": "699 Woodpoint Road, Jenkinsville, Palau, 4026"
    },
    {
      "index": 21,
      "balance": "$2,620.42",
      "name": "Ratliff Moore",
      "company": "FIBRODYNE",
      "email": "ratliffmoore@fibrodyne.com",
      "phone": "+1 (857) 529-2309",
      "address": "287 Crown Street, Tuttle, Illinois, 3121"
    },
    {
      "index": 22,
      "balance": "$3,946.52",
      "name": "Bailey Wolfe",
      "company": "BLUEGRAIN",
      "email": "baileywolfe@bluegrain.com",
      "phone": "+1 (842) 523-3907",
      "address": "876 Virginia Place, Sanborn, Wyoming, 164"
    },
    {
      "index": 23,
      "balance": "$2,439.35",
      "name": "Donna Gentry",
      "company": "SKYBOLD",
      "email": "donnagentry@skybold.com",
      "phone": "+1 (927) 515-2409",
      "address": "998 Royce Place, Cecilia, Mississippi, 3892"
    },
    {
      "index": 24,
      "balance": "$1,542.77",
      "name": "Anastasia Livingston",
      "company": "APEX",
      "email": "anastasialivingston@apex.com",
      "phone": "+1 (986) 576-2485",
      "address": "268 Applegate Court, Yogaville, Washington, 3359"
    },
    {
      "index": 25,
      "balance": "$1,681.94",
      "name": "Carpenter Graham",
      "company": "COMCUR",
      "email": "carpentergraham@comcur.com",
      "phone": "+1 (809) 426-3118",
      "address": "662 Billings Place, Williams, South Carolina, 9616"
    },
    {
      "index": 26,
      "balance": "$3,275.47",
      "name": "Theresa Peck",
      "company": "EXOSTREAM",
      "email": "theresapeck@exostream.com",
      "phone": "+1 (910) 471-2095",
      "address": "951 Ivan Court, Orin, Nevada, 6831"
    },
    {
      "index": 27,
      "balance": "$1,747.02",
      "name": "Curry Robbins",
      "company": "SQUISH",
      "email": "curryrobbins@squish.com",
      "phone": "+1 (875) 427-2411",
      "address": "653 Folsom Place, Kraemer, Michigan, 8872"
    },
    {
      "index": 28,
      "balance": "$2,265.01",
      "name": "Poole Nicholson",
      "company": "EXOSPEED",
      "email": "poolenicholson@exospeed.com",
      "phone": "+1 (938) 477-2298",
      "address": "500 Micieli Place, Smock, Oregon, 1121"
    },
    {
      "index": 29,
      "balance": "$1,872.18",
      "name": "Galloway Pugh",
      "company": "EARTHPURE",
      "email": "gallowaypugh@earthpure.com",
      "phone": "+1 (882) 477-2643",
      "address": "849 Seton Place, Rivera, Colorado, 3527"
    }
  ]

module.exports = {
    sample
}