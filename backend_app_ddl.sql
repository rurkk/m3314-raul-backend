--
-- PostgreSQL database dump
--

\restrict q20meqb2ITbSbct0KpIfBmL30I1puOPWoCRe2CgMUNOL82SMZde1fkbw4A881vM

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg12+2)
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: backend_app; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA backend_app;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: migrations; Type: TABLE; Schema: backend_app; Owner: -
--

CREATE TABLE backend_app.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: backend_app; Owner: -
--

CREATE SEQUENCE backend_app.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: backend_app; Owner: -
--

ALTER SEQUENCE backend_app.migrations_id_seq OWNED BY backend_app.migrations.id;


--
-- Name: owner_profiles; Type: TABLE; Schema: backend_app; Owner: -
--

CREATE TABLE backend_app.owner_profiles (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    headline character varying(160) NOT NULL,
    bio text,
    city character varying(120),
    avatar_url character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: owner_profiles_id_seq; Type: SEQUENCE; Schema: backend_app; Owner: -
--

CREATE SEQUENCE backend_app.owner_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: owner_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: backend_app; Owner: -
--

ALTER SEQUENCE backend_app.owner_profiles_id_seq OWNED BY backend_app.owner_profiles.id;


--
-- Name: portfolio_owners; Type: TABLE; Schema: backend_app; Owner: -
--

CREATE TABLE backend_app.portfolio_owners (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    display_name character varying(120) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: portfolio_owners_id_seq; Type: SEQUENCE; Schema: backend_app; Owner: -
--

CREATE SEQUENCE backend_app.portfolio_owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolio_owners_id_seq; Type: SEQUENCE OWNED BY; Schema: backend_app; Owner: -
--

ALTER SEQUENCE backend_app.portfolio_owners_id_seq OWNED BY backend_app.portfolio_owners.id;


--
-- Name: project_skills; Type: TABLE; Schema: backend_app; Owner: -
--

CREATE TABLE backend_app.project_skills (
    id integer NOT NULL,
    project_id integer NOT NULL,
    skill_id integer NOT NULL,
    emphasis smallint DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: project_skills_id_seq; Type: SEQUENCE; Schema: backend_app; Owner: -
--

CREATE SEQUENCE backend_app.project_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: backend_app; Owner: -
--

ALTER SEQUENCE backend_app.project_skills_id_seq OWNED BY backend_app.project_skills.id;


--
-- Name: projects; Type: TABLE; Schema: backend_app; Owner: -
--

CREATE TABLE backend_app.projects (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    title character varying(180) NOT NULL,
    slug character varying(200) NOT NULL,
    summary text NOT NULL,
    repository_url character varying(255),
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: backend_app; Owner: -
--

CREATE SEQUENCE backend_app.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: backend_app; Owner: -
--

ALTER SEQUENCE backend_app.projects_id_seq OWNED BY backend_app.projects.id;


--
-- Name: skills; Type: TABLE; Schema: backend_app; Owner: -
--

CREATE TABLE backend_app.skills (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    name character varying(120) NOT NULL,
    category character varying(80) NOT NULL,
    level smallint DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: backend_app; Owner: -
--

CREATE SEQUENCE backend_app.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: backend_app; Owner: -
--

ALTER SEQUENCE backend_app.skills_id_seq OWNED BY backend_app.skills.id;


--
-- Name: migrations id; Type: DEFAULT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.migrations ALTER COLUMN id SET DEFAULT nextval('backend_app.migrations_id_seq'::regclass);


--
-- Name: owner_profiles id; Type: DEFAULT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.owner_profiles ALTER COLUMN id SET DEFAULT nextval('backend_app.owner_profiles_id_seq'::regclass);


--
-- Name: portfolio_owners id; Type: DEFAULT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.portfolio_owners ALTER COLUMN id SET DEFAULT nextval('backend_app.portfolio_owners_id_seq'::regclass);


--
-- Name: project_skills id; Type: DEFAULT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.project_skills ALTER COLUMN id SET DEFAULT nextval('backend_app.project_skills_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.projects ALTER COLUMN id SET DEFAULT nextval('backend_app.projects_id_seq'::regclass);


--
-- Name: skills id; Type: DEFAULT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.skills ALTER COLUMN id SET DEFAULT nextval('backend_app.skills_id_seq'::regclass);


--
-- Name: skills PK_0d3212120f4ecedf90864d7e298; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.skills
    ADD CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY (id);


--
-- Name: portfolio_owners PK_0edf92ddf4ca4149028a65b8513; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.portfolio_owners
    ADD CONSTRAINT "PK_0edf92ddf4ca4149028a65b8513" PRIMARY KEY (id);


--
-- Name: projects PK_6271df0a7aed1d6c0691ce6ac50; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);


--
-- Name: project_skills PK_76a7f6ff4b84e9a580e24d09cc6; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.project_skills
    ADD CONSTRAINT "PK_76a7f6ff4b84e9a580e24d09cc6" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: owner_profiles PK_f50964d90a34725685860cbdda5; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.owner_profiles
    ADD CONSTRAINT "PK_f50964d90a34725685860cbdda5" PRIMARY KEY (id);


--
-- Name: projects UQ_96e045ab8b0271e5f5a91eae1ee; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.projects
    ADD CONSTRAINT "UQ_96e045ab8b0271e5f5a91eae1ee" UNIQUE (slug);


--
-- Name: portfolio_owners UQ_d1319efa00bd7d8917ecfca1573; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.portfolio_owners
    ADD CONSTRAINT "UQ_d1319efa00bd7d8917ecfca1573" UNIQUE (email);


--
-- Name: owner_profiles UQ_e46de14131fb229c7a307269e47; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.owner_profiles
    ADD CONSTRAINT "UQ_e46de14131fb229c7a307269e47" UNIQUE (owner_id);


--
-- Name: project_skills UQ_project_skill_link; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.project_skills
    ADD CONSTRAINT "UQ_project_skill_link" UNIQUE (project_id, skill_id);


--
-- Name: skills UQ_skill_owner_name; Type: CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.skills
    ADD CONSTRAINT "UQ_skill_owner_name" UNIQUE (owner_id, name);


--
-- Name: skills FK_7f2277da303cf72a0b941a84689; Type: FK CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.skills
    ADD CONSTRAINT "FK_7f2277da303cf72a0b941a84689" FOREIGN KEY (owner_id) REFERENCES backend_app.portfolio_owners(id) ON DELETE CASCADE;


--
-- Name: project_skills FK_903cd0ac4cc4681039d306c485e; Type: FK CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.project_skills
    ADD CONSTRAINT "FK_903cd0ac4cc4681039d306c485e" FOREIGN KEY (skill_id) REFERENCES backend_app.skills(id) ON DELETE CASCADE;


--
-- Name: projects FK_b1bd2fbf5d0ef67319c91acb5cf; Type: FK CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.projects
    ADD CONSTRAINT "FK_b1bd2fbf5d0ef67319c91acb5cf" FOREIGN KEY (owner_id) REFERENCES backend_app.portfolio_owners(id) ON DELETE CASCADE;


--
-- Name: project_skills FK_d28a809ea4c3e5d71a5679a33b4; Type: FK CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.project_skills
    ADD CONSTRAINT "FK_d28a809ea4c3e5d71a5679a33b4" FOREIGN KEY (project_id) REFERENCES backend_app.projects(id) ON DELETE CASCADE;


--
-- Name: owner_profiles FK_e46de14131fb229c7a307269e47; Type: FK CONSTRAINT; Schema: backend_app; Owner: -
--

ALTER TABLE ONLY backend_app.owner_profiles
    ADD CONSTRAINT "FK_e46de14131fb229c7a307269e47" FOREIGN KEY (owner_id) REFERENCES backend_app.portfolio_owners(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict q20meqb2ITbSbct0KpIfBmL30I1puOPWoCRe2CgMUNOL82SMZde1fkbw4A881vM

