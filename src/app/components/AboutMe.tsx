/* eslint-disable @next/next/no-img-element */
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

//add props isMobile:Boolean to the function
// const AboutMe: React.FC =
interface AboutMeProps {
  isMobile: boolean;
  // <div id="about" style={{ ...styles.container, padding: isMobile ? '10px' : '20px' }}>
}
const AboutMe: React.FC<AboutMeProps> = ({ isMobile }:AboutMeProps) => {
  return (
    <div id="about" style={styles.container}>
      <h2 style={styles.header}>About Me</h2>
      <div
        style={{ ...styles.row, flexDirection: isMobile ? "column" : "row" }}
      >
        <img
          src="./profile.jpeg"
          alt="Your Profile Picture"
          style={styles.profilePicture}
        />
        <p style={styles.paragraph}>
          I am a passionate and versatile innovator with a deep-rooted curiosity
          for solving complex problems at the intersection of technology, data,
          and strategy. With a strong foundation in computational thinking and
          analytical rigor, I thrive on transforming abstract concepts into
          tangible solutions that drive progress and create value. My journey is
          fueled by a blend of creativity, technical expertise, and an
          insatiable appetite for learning, allowing me to navigate diverse
          domains and adapt to the ever-evolving landscape of innovation.
          <br />
          Guided by a relentless pursuit of excellence, I approach challenges
          with a balance of strategic foresight and meticulous attention to
          detail. Whether it’s designing advanced algorithms, analyzing
          intricate datasets, or exploring emerging technologies, I am driven by
          the opportunity to contribute meaningful insights and groundbreaking
          solutions. Collaboration and interdisciplinary thinking are at the
          core of my philosophy, enabling me to bridge gaps, foster innovation,
          and inspire change. Ultimately, I see every challenge as a canvas for
          creativity and every solution as a stepping stone toward a future
          shaped by purpose, ingenuity, and endless possibilities.
        </p>
      </div>

      <h3 style={styles.subHeader}>Professional Background</h3>
      <div style={styles.row}>
        <p style={styles.paragraph}>
          I have honed my skills through diverse professional roles, including
          internships at renowned organizations such as Novade, Samsung PRISM,
          Chennai Metro Rails Limited, Infosys, Nucash, and Edue Limited. These
          experiences equipped me with a deep understanding of full-stack and
          iOS development, algorithms, cloud services, and DevOps. As the CTO &
          Co-Founder of Canverro, I spearheaded innovative solutions that
          bridged gaps in technology, driving meaningful impact.
        </p>
      </div>

      <h3 style={styles.subHeader}>Research and Innovations</h3>
      <p style={styles.paragraph}>
        I am deeply passionate about exploring intersections of quantum
        computing and finance. My dissertation on Quantum Machine Learning (QML)
        delves into leveraging quantum algorithms for financial modeling,
        showcasing my ability to apply cutting-edge research to industry
        challenges. Notably, I’ve devised a method that uses qudits and Grover’s
        algorithm to break hash functions in linear time, demonstrating my knack
        for tackling complex computational problems with creative solutions.
      </p>

      <h3 style={styles.subHeader}>Investment Insights</h3>
      <p style={styles.paragraph}>
        I am equally fascinated by financial markets, with a focus on investment
        strategies and quantitative analysis. I’ve analyzed U.S. stocks like
        ServiceNow and Paycom Software, exploring valuation metrics such as
        Price-to-Earnings ratios, and I actively identify growth opportunities
        in small-cap companies with promising revenue potential. My approach
        combines data-driven decision-making with a keen understanding of market
        dynamics, making me adept at bridging the worlds of technology and
        finance.
      </p>

      <h3 style={styles.subHeader}>Beyond the Professional Sphere</h3>
      <p style={styles.paragraph}>
        Outside the realm of my technical and professional endeavors, I immerse
        myself in exploring the profound mysteries of existence and the
        intricate tapestry of our universe. My interests extend far beyond the
        confines of technology and finance, reaching into the realms of
        evolution, space, quantum mechanics, philosophy, and history—subjects
        that not only inspire but also shape my understanding of humanity’s
        place in the cosmos. I often find myself reflecting on the grand
        narratives of our universe, from the moment of the Big Bang to the
        evolutionary journey that led to conscious beings pondering their
        origins.
        <br />
        <br /> The interplay between the infinitely vast cosmos and the
        intricate workings of quantum particles fascinates me, as it bridges the
        macro and micro scales of existence. These reflections fuel my curiosity
        about how the fundamental principles of the universe can be harnessed,
        not just for technological advancements, but to answer timeless
        questions about existence itself. Space, in particular, captivates my
        imagination—not merely as a frontier of exploration but as a stage for
        humanity’s potential to transcend its limitations. I marvel at the sheer
        vastness of the cosmos and the profound questions it raises about life
        beyond Earth, the origins of time, and the potential for interstellar
        communication.
        <br />
        <br /> This fascination often finds parallels in my projects, like
        secure satellite communication protocols, where I seek to replicate,
        albeit in a small way, the seamless and dynamic systems that govern
        celestial bodies. Philosophy and history ground these explorations,
        providing a framework to connect abstract scientific concepts with human
        experience. I am intrigued by how ancient civilizations grappled with
        questions of purpose and existence, and how their insights echo in
        today’s scientific pursuits. The convergence of these disciplines—where
        philosophy informs science, and history illuminates the future—is a
        constant source of inspiration for me. Quantum mechanics, with its
        mind-bending principles and infinite possibilities, is another area
        where I find endless wonder.
        <br />
        <br />
        The duality of particles, the strange entanglements, and the
        non-intuitive nature of quantum reality challenge the very foundations
        of classical thinking, pushing the boundaries of what we understand
        about reality itself. My work in quantum machine learning and
        algorithmic development is deeply influenced by this fascination, as I
        strive to bring abstract theories into practical applications that could
        revolutionize industries. I also take great interest in the
        interconnectedness of life and the philosophical implications of
        evolution. From the simplest single-celled organisms to the emergence of
        complex, intelligent beings, I find awe in how {"nature's"} patterns and
        processes mirror the complexity and elegance of the systems I study and
        create in my work. Writing and thinking about these topics allow me to
        connect deeply with both the material and the immaterial—using words to
        explore ideas that lie at the intersection of science, philosophy, and
        the human condition.
        <br />
        <br />
        It is through this lens that I approach both my professional and
        personal pursuits, seeking to understand not just how things work but
        why they matter in the grand scheme of existence. For me, these
        explorations are not mere intellectual pursuits; they are a way to
        contextualize my work and my life. They remind me that while we may
        strive to solve immediate problems and push the boundaries of
        technology, we are ultimately participants in a much larger story—a
        story of evolution, discovery, and the enduring quest to understand our
        place in the universe.
      </p>

      {/* <div style={styles.socialIconsContainer}>
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile-url"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.iconLink}
        >
          <i className="fab fa-linkedin" style={styles.icon}></i>
        </a>
        <a
          href="mailto:your-email@example.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.iconLink}
        >
          <i className="fa fa-envelope" style={styles.icon}></i>
        </a>
        <a
          href="https://www.your-website.com"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.iconLink}
        >
          <i className="fa fa-globe" style={styles.icon}></i>
        </a>
      </div> */}
    </div>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    color: "#333",
    // padding: "20px",
    // maxWidth: "800px",
    // margin: "0 auto",
    // backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "2em",
    color: "#0073e6",
    textAlign: "center",
    marginBottom: "20px",
  },
  subHeader: {
    fontSize: "1.5em",
    color: "#005bb5",
    marginTop: "20px",
  },
  paragraph: {
    fontSize: "1em",
    color: "#555",
    marginBottom: "20px",
    textAlign: "justify",
  },
  profilePicture: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginRight: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  socialIconsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  iconLink: {
    textDecoration: "none",
    color: "#0073e6",
    fontSize: "1.5em",
  },
  icon: {
    transition: "color 0.3s ease",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
};

export default AboutMe;
