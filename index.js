const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Working PNG logo URLs for credit card issuers
const cardLogos = {
  visa: "https://i.pinimg.com/564x/fd/f2/30/fdf230fba94c342bb462bfbfbe8a7446.jpg",
  mastercard: "https://static-00.iconduck.com/assets.00/mastercard-icon-512x322-qcvfjfth.png",
  american_express: "https://i.pinimg.com/474x/69/66/1b/69661b01146e8f72a09921d679cfd2d4.jpg",
  discover: "https://icons.veryicon.com/png/o/internet--web/modern-payment/icon_-pay-discover.png",
};

// Placeholder image for missing logos
const placeholderLogo = "https://i.pinimg.com/564x/fd/f2/30/fdf230fba94c342bb462bfbfbe8a7446.jpg";

// Sample bank names and their logos
const bankData = [
  {
    name: "Bank of America",
    logo: "https://www.pngarts.com/files/11/Bank-of-America-PNG-High-Quality-Image.png",
  },
  {
    name: "JPMorgan Chase",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGrtrR9UxtavNvExJrliRGh8zPUHry950YQ&s",
  },
  {
    name: "Wells Fargo",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxKCqq9Hp9lUB1YAh-evS8o-Y6plbRVHpfw&s",
  },
  {
    name: "Citibank",
    logo: "https://www.freepnglogos.com/uploads/citibank-png-logo/oninsightful-and-impactful-marketing-png-logo-2.png",
  },
  {
    name: "HSBC",
    logo: "https://www.shareicon.net/data/2015/11/11/670314_cards_512x512.png",
  },
];

app.get("/api/credit-card", (req, res) => {
  const cardType = faker.finance.creditCardIssuer().toLowerCase().replace(/\s+/g, "_");
  const bank = faker.helpers.arrayElement(bankData); // Randomly pick a bank

  const cardDetails = {
    cardNumber: faker.finance.creditCardNumber(),
    cardType: cardType,
    cardExpiry: faker.date.future().toISOString().split("T")[0],
    cardCVV: faker.finance.creditCardCVV(),
    cardHolder: faker.person.fullName(),
    cardLogo: cardLogos[cardType] || placeholderLogo,
    bankName: bank.name,
    bankLogo: bank.logo,
  };

  res.json(cardDetails);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
