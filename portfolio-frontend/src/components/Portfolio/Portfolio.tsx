import "./Portfolio.scss";
import PortfolioCard from "./PortfolioCard/PortfolioCard";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
        <li className="portfolio__element">
          <PortfolioCard />
        </li>
      </ul>
    </div>
  );
}
