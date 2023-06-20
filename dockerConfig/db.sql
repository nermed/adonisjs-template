-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 19, 2023 at 01:30 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestionChantier`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, 'database/migrations/1683083028208_users', 1, '2023-05-07 09:27:41'),
(2, 'database/migrations/1683083028218_api_tokens', 1, '2023-05-07 09:27:41'),
(3, 'database/migrations/1683200639589_groups', 1, '2023-05-07 09:27:41'),
(4, 'database/migrations/1683201140579_user_to_groups', 1, '2023-05-07 09:27:41'),
(5, 'database/migrations/1683447887082_add_user_to_groups', 1, '2023-05-07 09:27:41'),
(6, 'database/migrations/1684557890920_permissions', 2, '2023-05-20 04:54:41'),
(7, 'database/migrations/1684558271122_add_user_to_permissions', 2, '2023-05-20 04:54:41'),
(8, 'database/migrations/1684558308871_group_to_permissions', 2, '2023-05-20 04:54:41'),
(9, 'database/migrations/1684558850120_add_delete_status_to_permissions', 3, '2023-05-20 05:02:36'),
(12, 'database/migrations/1685378080440_dossiers', 4, '2023-05-29 16:53:41'),
(13, 'database/migrations/1685378644923_dossier_details', 5, '2023-05-29 16:56:56'),
(14, 'database/migrations/1685378927090_dossier_files', 5, '2023-05-29 16:56:56'),
(16, 'database/migrations/1685516359144_projet_commandes', 6, '2023-05-31 14:32:05'),
(17, 'database/migrations/1685533041455_projet_commande_details', 6, '2023-05-31 14:32:05'),
(18, 'database/migrations/1685543606391_add_dossier_niveaus', 7, '2023-05-31 14:37:54'),
(19, 'database/migrations/1685549601951_add_info_chantier_date_emission_to_projet_commandes', 8, '2023-05-31 17:21:52'),
(20, 'database/migrations/1686339677761_projet_commande_validations', 9, '2023-06-10 03:44:47'),
(21, 'database/migrations/1686374583538_add_projet_commande_niveaus', 10, '2023-06-10 05:25:29'),
(22, 'database/migrations/1686591584031_add_message_affectation_dossiers', 11, '2023-06-12 17:46:22'),
(23, 'database/migrations/1687056027375_projet_commande_messages', 12, '2023-06-18 03:08:30'),
(24, 'database/migrations/1687057663372_add_assigns_dossiers', 12, '2023-06-18 03:08:30');

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema_versions`
--

CREATE TABLE `adonis_schema_versions` (
  `version` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Table structure for table `api_tokens`
--

CREATE TABLE `api_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dossiers`
--

CREATE TABLE `dossiers` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `taped_price_by` int(10) UNSIGNED DEFAULT NULL,
  `taped_price_at` datetime DEFAULT NULL,
  `deleted_status` tinyint(4) DEFAULT 0,
  `deleted_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 10:00:00',
  `dossier_niveau` varchar(255) DEFAULT '1' COMMENT '0: Début; 1: ingenieur, 2: president de la commission, 3: disponibilité budgetaire, 4: directeur du fonds routier, 5: DTR, 6: DG/ARB, 7: secretaire',
  `assigned_to` varchar(255) NOT NULL COMMENT 'Les ingénieurs qui récevront le dossier',
  `message` text DEFAULT NULL COMMENT 'Pour notifier l''ingénieur',
  `assigned_to_others` varchar(255) NOT NULL COMMENT 'Les ingénieurs qui récevront le dossier'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dossier_details`
--

CREATE TABLE `dossier_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_dossier` int(10) UNSIGNED NOT NULL,
  `designation` varchar(255) NOT NULL,
  `nombre` float(8,2) NOT NULL,
  `unite` varchar(255) NOT NULL,
  `quantite` float(8,2) NOT NULL,
  `prixUnitaireHTVA` double DEFAULT NULL,
  `prixTotalHTVA` double DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- --------------------------------------------------------

--
-- Table structure for table `dossier_files`
--

CREATE TABLE `dossier_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_dossier` int(10) UNSIGNED NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(180) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `delete_status` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00',
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_by` int(10) UNSIGNED DEFAULT NULL,
  `deleted_by` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `delete_status`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 'Administration', 'Pour l\'administration', 1, '2023-05-07 09:53:12', '2023-05-07 09:53:12', 1, 1, 1),
(2, 'Comptable 2', 'Pour le comptable du deuxieme etage', 1, '2023-06-03 10:21:15', '2023-06-03 10:21:15', 1, NULL, 1),
(3, 'Comptable 1', 'Pour le comptable du premier etage', 1, '2023-06-03 10:21:16', '2023-06-03 10:21:16', 1, NULL, 1),
(4, 'Comptable 3', 'Pour le comptable du troisieme etage', 1, '2023-06-03 10:21:18', '2023-06-03 10:21:18', 1, NULL, 1),
(5, 'Gardiens', NULL, 1, '2023-06-03 05:37:50', '2023-06-03 05:37:50', 2, NULL, 1),
(6, 'Ingénieurs', 'Pour les ingénieurs', 0, '2023-06-03 10:21:22', '2023-06-03 10:21:22', 1, 1, NULL),
(7, 'President de la Commission', 'President de la commission', 0, '2023-06-03 10:18:11', '2023-06-03 10:18:11', 1, NULL, NULL),
(8, 'Disponibilité Budgétaire', 'Disponibilité Budgétaire', 0, '2023-06-03 10:18:53', '2023-06-03 10:18:53', 1, NULL, NULL),
(9, 'Directeur du Fonds Routier Pour Accord', 'Directeur du Fonds Routier Pour Accord', 0, '2023-06-03 10:20:34', '2023-06-03 10:20:34', 1, NULL, NULL),
(10, 'Autorisation du DG/ARB', 'Autorisation du DG/ARB', 1, '2023-06-16 06:17:09', '2023-06-03 10:21:11', 1, NULL, NULL),
(11, 'Directeur de Ressources Humaines', 'Directeur de Ressources Humaines', 0, '2023-06-03 10:22:29', '2023-06-03 10:22:29', 1, NULL, NULL),
(12, 'Directeur Général', 'Directeur Général', 0, '2023-06-03 10:22:50', '2023-06-03 10:22:50', 1, NULL, NULL),
(13, 'DTR', 'Direction TR', 0, '2023-06-10 10:45:37', '2023-06-10 10:45:37', 8, NULL, NULL),
(14, 'Secretariat', 'Pour avoir les dossiers', 0, '2023-06-18 18:02:30', '2023-06-18 18:02:30', 11, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `group_to_permissions`
--

CREATE TABLE `group_to_permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `deleteStatus` tinyint(4) DEFAULT 0,
  `deleteBy` int(10) UNSIGNED DEFAULT NULL,
  `createdBy` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_to_permissions`
--

INSERT INTO `group_to_permissions` (`id`, `group_id`, `permission_id`, `deleteStatus`, `deleteBy`, `createdBy`, `created_at`, `updated_at`) VALUES
(6, 8, 22, 0, NULL, 1, '2023-06-03 12:03:28', '2023-01-01 00:00:00'),
(7, 9, 20, 0, NULL, 1, '2023-06-03 12:04:03', '2023-01-01 00:00:00'),
(8, 10, 21, 0, NULL, 1, '2023-06-03 12:04:40', '2023-01-01 00:00:00'),
(12, 7, 14, 0, NULL, 3, '2023-06-08 05:55:44', '2023-01-01 00:00:00'),
(13, 7, 15, 0, NULL, 3, '2023-06-08 05:55:44', '2023-01-01 00:00:00'),
(14, 7, 16, 0, NULL, 3, '2023-06-08 05:55:44', '2023-01-01 00:00:00'),
(15, 7, 23, 0, NULL, 3, '2023-06-08 05:55:44', '2023-01-01 00:00:00'),
(16, 6, 13, 0, NULL, 3, '2023-06-10 03:56:22', '2023-01-01 00:00:00'),
(17, 6, 14, 0, NULL, 3, '2023-06-10 03:56:22', '2023-01-01 00:00:00'),
(18, 6, 17, 0, NULL, 3, '2023-06-10 03:56:22', '2023-01-01 00:00:00'),
(19, 6, 18, 0, NULL, 3, '2023-06-10 03:56:22', '2023-01-01 00:00:00'),
(22, 13, 13, 0, NULL, 10, '2023-06-12 16:45:30', '2023-01-01 00:00:00'),
(23, 13, 19, 0, NULL, 10, '2023-06-12 16:45:30', '2023-01-01 00:00:00'),
(24, 13, 24, 0, NULL, 10, '2023-06-12 16:45:30', '2023-01-01 00:00:00'),
(50, 12, 1, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(51, 12, 2, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(52, 12, 3, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(53, 12, 4, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(54, 12, 5, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(55, 12, 6, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(56, 12, 7, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(57, 12, 8, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(58, 12, 9, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(59, 12, 10, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(60, 12, 11, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(61, 12, 12, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(62, 12, 21, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(63, 12, 26, 0, NULL, 11, '2023-06-16 06:48:04', '2023-01-01 00:00:00'),
(64, 14, 25, 0, NULL, 11, '2023-06-18 18:07:19', '2023-01-01 00:00:00'),
(65, 14, 26, 0, NULL, 11, '2023-06-18 18:07:19', '2023-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00',
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_by` int(10) UNSIGNED DEFAULT NULL,
  `deleted_by` int(10) UNSIGNED DEFAULT NULL,
  `deleteStatus` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `created_at`, `updated_at`, `created_by`, `updated_by`, `deleted_by`, `deleteStatus`) VALUES
(1, 'user_create', 'Create User', '2023-05-20 06:27:47', '2023-05-20 06:27:47', 1, NULL, NULL, 0),
(2, 'user_edit', 'Edit user infomation', '2023-05-20 06:54:01', '2023-05-20 06:54:01', 1, NULL, NULL, 0),
(3, 'user_delete', 'Delete user', '2023-05-20 06:54:23', '2023-05-20 06:54:23', 1, NULL, NULL, 0),
(4, 'user_menu', 'Menu user', '2023-05-20 06:54:52', '2023-05-20 06:54:52', 1, NULL, NULL, 0),
(5, 'group_create', 'Create group', '2023-05-20 07:02:03', '2023-05-20 07:02:03', 1, 1, NULL, 0),
(6, 'group_edit', 'Edit group', '2023-05-20 06:55:25', '2023-05-20 06:55:25', 1, NULL, NULL, 0),
(7, 'group_delete', 'Delete group', '2023-05-20 06:55:45', '2023-05-20 06:55:45', 1, NULL, NULL, 0),
(8, 'group_menu', 'Group menu', '2023-05-20 06:56:10', '2023-05-20 06:56:10', 1, NULL, NULL, 0),
(9, 'permission_create', 'Create a permission', '2023-05-20 06:56:49', '2023-05-20 06:56:49', 1, NULL, NULL, 0),
(10, 'permission_edit', 'Edit permission', '2023-05-20 07:02:25', '2023-05-20 07:02:25', 1, NULL, NULL, 0),
(11, 'permission_delete', 'Delete permission', '2023-05-20 07:02:47', '2023-05-20 07:02:47', 1, NULL, NULL, 0),
(12, 'permission_menu', 'Permission Menu', '2023-05-20 07:03:10', '2023-05-20 07:03:10', 1, NULL, NULL, 0),
(13, 'document_create', 'Create a document', '2023-06-03 11:52:47', '2023-06-03 11:52:47', 1, NULL, NULL, 0),
(14, 'document_edit', 'Edit a document', '2023-06-03 11:53:14', '2023-06-03 11:53:14', 1, NULL, NULL, 0),
(15, 'document_add_price', 'Adding price on document', '2023-06-03 11:53:39', '2023-06-03 11:53:39', 1, NULL, NULL, 0),
(16, 'document_add_file', 'Adding file on document', '2023-06-03 11:53:58', '2023-06-03 11:53:58', 1, NULL, NULL, 0),
(17, 'document_add_project', 'Adding project on document', '2023-06-03 11:54:34', '2023-06-03 11:54:34', 1, NULL, NULL, 0),
(18, 'document_validate_service_demande', 'Validate for service demande', '2023-06-03 11:56:08', '2023-06-03 11:56:08', 1, NULL, NULL, 0),
(19, 'document_validate_direction', 'Validate for the direction', '2023-06-03 11:56:30', '2023-06-03 11:56:30', 1, NULL, NULL, 0),
(20, 'document_validate_fonds_routier', 'Validate for Fonds Routier', '2023-06-03 11:57:02', '2023-06-03 11:57:02', 1, NULL, NULL, 0),
(21, 'document_validate_autorisation_dg_arb', 'Validate for Autorisation DG/ARB', '2023-06-03 11:58:08', '2023-06-03 11:58:08', 1, NULL, NULL, 0),
(22, 'document_validate_disponibilite_budgetaire', 'Validate for Disponibilité Budgétaire', '2023-06-03 12:03:16', '2023-06-03 12:03:16', 1, NULL, NULL, 0),
(23, 'document_validate_president_commission', 'Pour la validation du Président de Commission', '2023-06-08 05:55:31', '2023-06-08 05:55:31', 3, NULL, NULL, 0),
(24, 'document_affectation', 'Document Affectation ', '2023-06-12 16:39:46', '2023-06-12 16:39:46', 10, NULL, NULL, 0),
(25, 'document_print', 'Print document', '2023-06-16 03:08:39', '2023-06-16 03:08:39', 1, NULL, NULL, 0),
(26, 'document_menu', 'Menu document', '2023-06-16 06:15:13', '2023-06-16 06:15:13', 11, NULL, NULL, 0),
(27, 'document_menu_affectation', 'Menu des affectations', '2023-06-18 02:07:31', '2023-06-18 02:07:31', 10, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `projet_commandes`
--

CREATE TABLE `projet_commandes` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_dossier_detail` int(10) UNSIGNED NOT NULL COMMENT 'si le detail est effacé, le projet de commande et ses détails',
  `traitement` varchar(255) NOT NULL COMMENT 'choisir entre 1: normal, 2: urgence, 3: prioritaire',
  `origineProjet` varchar(255) NOT NULL COMMENT 'choisir entre 1: DG/ARB, 2: DFR, 3: DETR',
  `personneAvertir` varchar(255) DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `deleted_status` tinyint(4) DEFAULT 0,
  `deleted_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00',
  `info_chantier` varchar(255) DEFAULT NULL COMMENT 'nom du chantier ou adresse du chantier',
  `date_emission` datetime DEFAULT NULL COMMENT 'date d''emission',
  `projet_commande_niveau` varchar(255) DEFAULT '1' COMMENT 'dépendra du niveau du dossier'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- --------------------------------------------------------

--
-- Table structure for table `projet_commande_details`
--

CREATE TABLE `projet_commande_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_projet_commande` int(10) UNSIGNED NOT NULL,
  `ref_post_budget` varchar(255) DEFAULT NULL,
  `numeroRef` float(8,2) DEFAULT NULL,
  `designationAffectation` varchar(255) DEFAULT NULL,
  `quantiteDemande` float(8,2) DEFAULT NULL,
  `montantEstime` double DEFAULT NULL,
  `niveauStockMagasin` float(8,2) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `projet_commande_messages`
--

CREATE TABLE `projet_commande_messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_projet_commande` int(10) UNSIGNED NOT NULL COMMENT 'si le projet de commande est effacé, les messages aussi seront supprimés',
  `message` text DEFAULT NULL COMMENT 'Message à envoyer à l''ingénieur',
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL COMMENT 'Réference pour bien lister le message',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `projet_commande_validations`
--

CREATE TABLE `projet_commande_validations` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_projet_commande` int(10) UNSIGNED NOT NULL COMMENT 'si le projet de commande est effacé, les validations aussi',
  `serviceDemandeur` varchar(255) DEFAULT NULL COMMENT 'Place à l''ingénieur de valider',
  `dispoBudgetaire` varchar(255) DEFAULT NULL COMMENT 'Place au respo de budgét de valider',
  `directionFondsRoutier` varchar(255) DEFAULT NULL COMMENT 'Place au directeur de fonds routier de valider',
  `dtr` varchar(255) DEFAULT NULL COMMENT 'Place au DTR de valider',
  `dgArb` varchar(255) DEFAULT NULL COMMENT 'Place au DG ARB de valider',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(180) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(180) NOT NULL,
  `remember_me_token` varchar(255) DEFAULT NULL,
  `deleteBy` int(10) UNSIGNED DEFAULT NULL,
  `deleteStatus` tinyint(4) DEFAULT 0,
  `createdBy` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `remember_me_token`, `deleteBy`, `deleteStatus`, `createdBy`, `created_at`, `updated_at`) VALUES
(1, 'nermed', 'nermed@admin.com', '$scrypt$n=16384,r=8,p=1$CAwNgmIB/PSy0cgUzc7O+w$wftLoGo/liaO81QJsivU5P5fmWb7zKG750MmInj3F0BA0BQ8zfyDUBBfNVnlZ0jvIAK/O66DwEW3xIS40gB0PQ', NULL, NULL, 0, NULL, '2023-05-07 09:28:23', '2023-05-07 09:28:23'),
(2, 'jeanbosco', 'jeanbosco@gmail.com', '$scrypt$n=16384,r=8,p=1$YiuHCsOzZ+OYWus1YVFhWg$LneB7UmDTj2iwaHPI+F/FMFipjMQIGoB2tMhQOpw7ydoU4eerFlEu1O+FIbP3ZWRywjPbbb3sEDAgW6mo6fq6w', NULL, 5, 1, NULL, '2023-06-10 13:29:13', '2023-05-07 09:57:59'),
(3, 'Ingénieur 1', 'ingenieur@gmail.com', '$scrypt$n=16384,r=8,p=1$O+BwQVlq/FBO/YsWUuqp4w$mfzvKSQLl3qq1tuM2/A4ItT2D1GcdikZ5/v3xtqqaBA9tuzVY9gULOkpwq15a83Vmx2hOVsvJWEHZpk0odhiog', NULL, NULL, 0, NULL, '2023-06-03 11:45:54', '2023-06-03 11:45:54'),
(5, 'President Commission', 'president_commission@gmail.com', '$scrypt$n=16384,r=8,p=1$RoThv63kJGIkAOxfhDpQoQ$QrEe43IqonTlbzhRy0NGc1w4RdXLJ8bWiVBPaUdreWT23ORbTKdGCDGeAF9qs99GRmZNwSWw/3RmMZE0s3xzyg', NULL, NULL, 0, 3, '2023-06-04 06:54:55', '2023-06-04 06:54:55'),
(7, 'Responsable Dispo', 'responsable_dispo@gmail.com', '$scrypt$n=16384,r=8,p=1$CIKh72gdOA74sBKqrK3+dA$dWK2aDL5g2v/iYbrZWbdbxZxc0p9WCt6lualOj5o3GA4DEnHj9TjbWq4kjMtN7nafT1dPP31rwqBIU8SW2DtoA', NULL, NULL, 0, 3, '2023-06-10 06:00:02', '2023-06-10 06:00:02'),
(8, 'Directeur Fonds Routier', 'directeur_fonds@gmail.com', '$scrypt$n=16384,r=8,p=1$MwPDHaYWwAz//koCP3oZbA$h4BidyMGIj9npxZ0kyxwFf3NsCwmvWPjvYaP1GOg5X5kVTWtXAIwuGV5sGwcJEYfZ3lMRpgwIz42ONAeXrnoPA', NULL, NULL, 0, 7, '2023-06-10 10:42:57', '2023-06-10 10:42:57'),
(9, 'Ingénieur 2', 'ingenieur2@gmail.com', '$scrypt$n=16384,r=8,p=1$p68rV5ts58hJt+HR9C3/+A$KNTw2+p2RKPFhKkie+6TNFLtQG1+005y4FsFEPDvy9R0mqYbEtjbV8hF7x2i8nPG54gAOsPt4vsDGR0ohFm0tg', NULL, NULL, 0, 1, '2023-06-10 16:16:06', '2023-06-10 16:16:06'),
(10, 'DTR', 'dtr@gmail.com', '$scrypt$n=16384,r=8,p=1$bozzAc1p6PrC6B5X8ldq3A$9Ybb+ECFBfX78AOHVriSzq9IpoyxNkKJuZK9V4vnTclqzzd6uzen6rFD5qDX5XN2I6+1kVwUGkdrJu4ehzA/1g', NULL, NULL, 0, 9, '2023-06-10 18:14:52', '2023-06-10 18:14:52'),
(11, 'DG ARB', 'dg@gmail.com', '$scrypt$n=16384,r=8,p=1$VnU4D4DPR2PAld1JnbdQvw$mxEJRqpEZGGNF9qdZ+pBRNp9mhGu8xD3bJRLccpMjDtRTnCmR2qJraNbpFHrPTrQEWeqjDrrRE6ABx96olTZ/w', NULL, NULL, 0, 1, '2023-06-16 03:09:55', '2023-06-16 03:09:55'),
(12, 'Secretaire', 'secretaire@gmail.com', '$scrypt$n=16384,r=8,p=1$ewgOBIVVza6x81aPjehkBg$cJlBlyL3iLKjzT+v46nx7VqSWkjIkA8BWN/d45xkp2MvdNVVLRJWsdXznVmN7dcHLYwpwdIfi5aQsFaIX2IjcQ', NULL, NULL, 0, 11, '2023-06-18 18:03:05', '2023-06-18 18:03:05');

-- --------------------------------------------------------

--
-- Table structure for table `user_to_groups`
--

CREATE TABLE `user_to_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `deleteStatus` tinyint(4) DEFAULT 0,
  `deleteBy` int(10) UNSIGNED DEFAULT NULL,
  `createdBy` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '2023-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_to_groups`
--

INSERT INTO `user_to_groups` (`id`, `user_id`, `group_id`, `deleteStatus`, `deleteBy`, `createdBy`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 0, NULL, 1, '2023-05-07 15:50:19', '2023-01-01 00:00:00'),
(8, 2, 1, 0, NULL, 3, '2023-06-04 05:46:24', '2023-01-01 00:00:00'),
(9, 2, 1, 0, NULL, 3, '2023-06-04 05:46:24', '2023-01-01 00:00:00'),
(11, 3, 6, 0, NULL, 3, '2023-06-04 06:55:06', '2023-01-01 00:00:00'),
(14, 5, 7, 0, NULL, 3, '2023-06-10 05:59:07', '2023-01-01 00:00:00'),
(15, 7, 8, 0, NULL, 3, '2023-06-10 06:00:02', '2023-01-01 00:00:00'),
(16, 8, 9, 0, NULL, 7, '2023-06-10 10:42:57', '2023-01-01 00:00:00'),
(17, 9, 6, 0, NULL, 1, '2023-06-10 16:16:06', '2023-01-01 00:00:00'),
(33, 10, 13, 0, NULL, 1, '2023-06-11 05:47:20', '2023-01-01 00:00:00'),
(35, 11, 12, 0, NULL, 1, '2023-06-16 03:09:55', '2023-01-01 00:00:00'),
(38, 12, 14, 0, NULL, 11, '2023-06-18 18:03:17', '2023-01-01 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_tokens_token_unique` (`token`),
  ADD KEY `api_tokens_user_id_foreign` (`user_id`);

--
-- Indexes for table `dossiers`
--
ALTER TABLE `dossiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dossiers_created_by_foreign` (`created_by`),
  ADD KEY `dossiers_taped_price_by_foreign` (`taped_price_by`),
  ADD KEY `dossiers_deleted_by_foreign` (`deleted_by`);

--
-- Indexes for table `dossier_details`
--
ALTER TABLE `dossier_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dossier_details_id_dossier_foreign` (`id_dossier`);

--
-- Indexes for table `dossier_files`
--
ALTER TABLE `dossier_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dossier_files_id_dossier_foreign` (`id_dossier`),
  ADD KEY `dossier_files_created_by_foreign` (`created_by`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_created_by_foreign` (`created_by`),
  ADD KEY `groups_updated_by_foreign` (`updated_by`),
  ADD KEY `groups_deleted_by_foreign` (`deleted_by`);

--
-- Indexes for table `group_to_permissions`
--
ALTER TABLE `group_to_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_to_permissions_group_id_foreign` (`group_id`),
  ADD KEY `group_to_permissions_permission_id_foreign` (`permission_id`),
  ADD KEY `group_to_permissions_deleteby_foreign` (`deleteBy`),
  ADD KEY `group_to_permissions_createdby_foreign` (`createdBy`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permissions_created_by_foreign` (`created_by`),
  ADD KEY `permissions_updated_by_foreign` (`updated_by`),
  ADD KEY `permissions_deleted_by_foreign` (`deleted_by`);

--
-- Indexes for table `projet_commandes`
--
ALTER TABLE `projet_commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projet_commandes_id_dossier_detail_foreign` (`id_dossier_detail`),
  ADD KEY `projet_commandes_created_by_foreign` (`created_by`),
  ADD KEY `projet_commandes_deleted_by_foreign` (`deleted_by`);

--
-- Indexes for table `projet_commande_details`
--
ALTER TABLE `projet_commande_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projet_commande_details_id_projet_commande_foreign` (`id_projet_commande`),
  ADD KEY `projet_commande_details_created_by_foreign` (`created_by`);

--
-- Indexes for table `projet_commande_messages`
--
ALTER TABLE `projet_commande_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projet_commande_messages_id_projet_commande_foreign` (`id_projet_commande`),
  ADD KEY `projet_commande_messages_created_by_foreign` (`created_by`);

--
-- Indexes for table `projet_commande_validations`
--
ALTER TABLE `projet_commande_validations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projet_commande_validations_id_projet_commande_foreign` (`id_projet_commande`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_deleteby_foreign` (`deleteBy`),
  ADD KEY `users_createdby_foreign` (`createdBy`);

--
-- Indexes for table `user_to_groups`
--
ALTER TABLE `user_to_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_to_groups_user_id_foreign` (`user_id`),
  ADD KEY `user_to_groups_group_id_foreign` (`group_id`),
  ADD KEY `user_to_groups_deleteby_foreign` (`deleteBy`),
  ADD KEY `user_to_groups_createdby_foreign` (`createdBy`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `api_tokens`
--
ALTER TABLE `api_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dossiers`
--
ALTER TABLE `dossiers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `dossier_details`
--
ALTER TABLE `dossier_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `dossier_files`
--
ALTER TABLE `dossier_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `group_to_permissions`
--
ALTER TABLE `group_to_permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `projet_commandes`
--
ALTER TABLE `projet_commandes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `projet_commande_details`
--
ALTER TABLE `projet_commande_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `projet_commande_messages`
--
ALTER TABLE `projet_commande_messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projet_commande_validations`
--
ALTER TABLE `projet_commande_validations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_to_groups`
--
ALTER TABLE `user_to_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD CONSTRAINT `api_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dossiers`
--
ALTER TABLE `dossiers`
  ADD CONSTRAINT `dossiers_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `dossiers_deleted_by_foreign` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `dossiers_taped_price_by_foreign` FOREIGN KEY (`taped_price_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `dossier_details`
--
ALTER TABLE `dossier_details`
  ADD CONSTRAINT `dossier_details_id_dossier_foreign` FOREIGN KEY (`id_dossier`) REFERENCES `dossiers` (`id`);

--
-- Constraints for table `dossier_files`
--
ALTER TABLE `dossier_files`
  ADD CONSTRAINT `dossier_files_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `dossier_files_id_dossier_foreign` FOREIGN KEY (`id_dossier`) REFERENCES `dossiers` (`id`);

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `groups_deleted_by_foreign` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `groups_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `group_to_permissions`
--
ALTER TABLE `group_to_permissions`
  ADD CONSTRAINT `group_to_permissions_createdby_foreign` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `group_to_permissions_deleteby_foreign` FOREIGN KEY (`deleteBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `group_to_permissions_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `group_to_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `permissions_deleted_by_foreign` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `permissions_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `projet_commandes`
--
ALTER TABLE `projet_commandes`
  ADD CONSTRAINT `projet_commandes_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `projet_commandes_deleted_by_foreign` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `projet_commandes_id_dossier_detail_foreign` FOREIGN KEY (`id_dossier_detail`) REFERENCES `dossier_details` (`id`);

--
-- Constraints for table `projet_commande_details`
--
ALTER TABLE `projet_commande_details`
  ADD CONSTRAINT `projet_commande_details_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `projet_commande_details_id_projet_commande_foreign` FOREIGN KEY (`id_projet_commande`) REFERENCES `projet_commandes` (`id`);

--
-- Constraints for table `projet_commande_messages`
--
ALTER TABLE `projet_commande_messages`
  ADD CONSTRAINT `projet_commande_messages_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `projet_commande_messages_id_projet_commande_foreign` FOREIGN KEY (`id_projet_commande`) REFERENCES `projet_commandes` (`id`);

--
-- Constraints for table `projet_commande_validations`
--
ALTER TABLE `projet_commande_validations`
  ADD CONSTRAINT `projet_commande_validations_id_projet_commande_foreign` FOREIGN KEY (`id_projet_commande`) REFERENCES `projet_commandes` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_createdby_foreign` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_deleteby_foreign` FOREIGN KEY (`deleteBy`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_to_groups`
--
ALTER TABLE `user_to_groups`
  ADD CONSTRAINT `user_to_groups_createdby_foreign` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_to_groups_deleteby_foreign` FOREIGN KEY (`deleteBy`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_to_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `user_to_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
