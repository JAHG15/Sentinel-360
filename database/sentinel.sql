-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-09-2026 a las 01:59:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sentinel`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivos`
--

CREATE TABLE `dispositivos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `equipo` varchar(30) NOT NULL,
  `ip` varchar(30) NOT NULL,
  `mac` varchar(30) NOT NULL,
  `idf` varchar(50) NOT NULL,
  `puerto` bigint(20) UNSIGNED DEFAULT NULL,
  `estatus` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `dispositivos`
--

INSERT INTO `dispositivos` (`id`, `equipo`, `ip`, `mac`, `idf`, `puerto`, `estatus`, `created_at`, `updated_at`) VALUES
(2, 'Switch Huawei', '192.168.1.20', '11:22:33:44:55:66', 'IDF-03', 49, 0, '2025-09-19 23:13:28', '2025-09-30 22:54:52'),
(3, 'Switch huawei', '192.168.1.10', 'AA:BB:CC:DD:EE:FF', 'IDF-01', 30, 1, '2025-09-20 01:59:52', '2025-10-11 21:35:29'),
(4, 'PC 10', '192.168.1.40', 'AJKFJDSALKF', 'Nose', 12, 0, '2025-09-30 22:19:54', '2025-10-01 01:45:23'),
(5, 'PC 20', '192.168.1.21', 'dafdaf', 'X', 1, 0, '2025-09-30 22:28:55', '2025-10-01 01:45:38'),
(6, 'PC 14', '192.168.1.34', 'ajdklasjdka', 'Tal', 9, 0, '2025-09-30 22:33:19', '2025-10-11 21:35:40'),
(11, 'PC 14', '192.168.1.23', 'AA:BB:CC:DD:EE:FFF', 'Nose', 24, 1, '2025-10-02 15:28:24', '2025-10-02 15:28:24'),
(12, 'PC 15', '192.168.1.999', '11:22:33:44:55:98', 'X', 40, 1, '2025-10-06 17:59:14', '2025-10-06 17:59:14'),
(13, 'PC 2', '192.168.2.20', '11:22:66:44:55:66', 'IDF-03', 25, 1, '2025-10-11 21:35:02', '2025-10-11 21:35:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idfs`
--

CREATE TABLE `idfs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `equipo` varchar(70) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `ubicacion` varchar(50) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `fecha_creacion` date NOT NULL DEFAULT (curdate()),
  `estatus` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `idfs`
--

INSERT INTO `idfs` (`id`, `equipo`, `ip`, `ubicacion`, `url`, `fecha_creacion`, `estatus`, `created_at`, `updated_at`) VALUES
(5, 'Switch a', '192.12.12.12', 'Radios', '', '2025-09-24', 0, '2025-09-24 23:49:07', '2025-10-02 17:01:02'),
(6, 'Switch 3850', '192.168.1.22', 'Oficina Principal 2', 'https://drive.google.com/file/d/18-octRyuLdwyR6JGsAm-yoMPBFWv9TMB/view?usp=sharing', '2025-09-29', 1, '2025-09-29 18:25:03', '2025-10-13 15:05:06'),
(7, 'Switch Huawei', '192.168.1.30', 'Oficina Principal 1', 'https://drive.google.com/file/d/18-octRyuLdwyR6JGsAm-yoMPBFWv9TMB/view?usp=sharing', '2025-09-30', 1, '2025-09-30 22:58:44', '2025-10-06 18:55:03'),
(10, 'Equipo 6', '192.168.1.28', 'Piso 2', 'https://drive.google.com/file/d/18-octRyuLdwyR6JGsAm-yoMPBFWv9TMB/view?usp=sharing', '2025-10-01', 1, '2025-10-01 01:54:35', '2025-10-06 18:55:11'),
(12, 'Switch Huawei', '192.168.1.55', 'Piso 2', 'https://example48.com', '2025-10-02', 0, '2025-10-02 17:03:44', '2025-10-06 18:55:19'),
(15, 'Switch Huawei 33', '192.168.1.266', 'Radios', '', '2025-10-02', 0, '2025-10-02 17:36:21', '2025-10-11 21:23:06'),
(17, 'Switch Huawei 55', '192.168.1.668', 'Radios', 'https://example45.com', '2025-10-06', 0, '2025-10-06 17:57:58', '2025-10-06 18:55:28'),
(18, 'Switch Huawei', '192.168.1.2334', 'Piso 2', 'https://example45.com', '2025-10-06', 0, '2025-10-06 18:15:17', '2025-10-06 18:54:22'),
(19, 'Switch cisco', '192.168.1.890', 'Radios 2', 'https://drive.google.com/file/d/18-octRyuLdwyR6JGsAm-yoMPBFWv9TMB/view?usp=sharing', '2025-10-06', 1, '2025-10-06 19:05:31', '2025-10-11 21:34:10'),
(20, 'Switch Huawei', '192.168.1.50', 'Sala de control', NULL, '2025-10-11', 1, '2025-10-11 21:24:30', '2025-10-11 21:24:30'),
(21, 'PC 18', '192.168.1.89', 'Radios', 'https://drive.google.com/file/d/18-octRyuLdwyR6JGsAm-yoMPBFWv9TMB/view?usp=sharing', '2025-10-11', 0, '2025-10-11 21:25:16', '2025-10-11 21:34:01'),
(22, 'PC 1', '192.168.3.20', 'Oficina Principal 1', NULL, '2025-10-11', 1, '2025-10-11 21:31:38', '2025-10-11 21:31:38'),
(24, 'prueba', '192.168.1.100', 'prueba', 'https://drive.google.com/file/d/18-octRyuLdwyR6JGsAm-yoMPBFWv9TMB/view?usp=sharing', '2025-10-13', 1, '2025-10-13 15:06:07', '2025-10-13 15:06:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_09_19_182421_create_idfs_table', 2),
(5, '2025_09_19_223924_create_dispositivos_table', 3),
(6, '2025_09_19_232627_create_usuarios_table', 4),
(7, '2025_09_19_234618_create_personal_access_tokens_table', 5),
(8, '2025_09_20_000555_create_personal_access_tokens_table', 6),
(9, '2025_09_20_001114_create_personal_access_tokens_table', 7),
(10, '2025_09_20_003402_add_rol_to_usuarios_table', 8),
(11, '2025_10_01_015146_add_unique_index_to_ip_in_idfs_table', 9),
(12, '2025_10_02_152126_add_unique_index_to_ip_and_mac_in_dispositivos_table', 10),
(13, '2025_10_02_155246_rename_url_to_configuracion_in_idfs_table', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\Usuario', 1, 'auth_token', '42f34a0fd0993991f260b27a5dba9ff3bfaf94e06528e39eb6224ef5f7a6c11b', '[]', NULL, '2025-09-20 00:57:42', '2025-09-20 00:42:42', '2025-09-20 00:42:42'),
(3, 'App\\Models\\Usuario', 1, 'auth_token', '1ba243fcfb90ef1ed20ff25160e5a7a5cd9968342c75f90fe5b33b1d9d76e867', '[]', NULL, '2025-09-20 01:41:27', '2025-09-20 01:26:27', '2025-09-20 01:26:27'),
(4, 'App\\Models\\Usuario', 5, 'auth_token', '52065243ebdaf260c4ff595ee3c85af5d8b80a3a2898e7fe5066f0e227a8366b', '[]', NULL, '2025-09-20 02:04:00', '2025-09-20 01:49:00', '2025-09-20 01:49:00'),
(5, 'App\\Models\\Usuario', 2, 'auth_token', '6c938d67ddb4ced61d710f630fa3ca179742bbc0cb94f8d9d04ae63e7fb2dd7b', '[]', NULL, '2025-09-20 02:04:42', '2025-09-20 01:49:42', '2025-09-20 01:49:42'),
(6, 'App\\Models\\Usuario', 2, 'auth_token', '801a0f2331180661cc746edb2cedbbff5d9c9fc10e5c97ac21790bbdcc6d46c7', '[]', '2025-09-20 01:56:56', '2025-09-20 02:10:47', '2025-09-20 01:55:47', '2025-09-20 01:56:56'),
(7, 'App\\Models\\Usuario', 5, 'auth_token', 'ec0c01f1e878cbcd8bbd5284431c0e6eb453ce7ea0efd7c3e1cf49bc6395908c', '[]', '2025-09-20 02:00:15', '2025-09-20 02:12:27', '2025-09-20 01:57:27', '2025-09-20 02:00:15'),
(8, 'App\\Models\\Usuario', 5, 'auth_token', 'c6323bef221b39b3939275533faf72a42ac0180a48f25c5ed099300c832bbf3b', '[]', '2025-09-20 02:10:37', '2025-09-20 02:16:33', '2025-09-20 02:01:33', '2025-09-20 02:10:37'),
(9, 'App\\Models\\Usuario', 5, 'auth_token', '6c2ae1fb2a58cc1b04ddfdb7e439c52211b288a925ec0eee97fb2f76a5745ff5', '[]', NULL, '2025-09-22 15:17:03', '2025-09-22 15:02:03', '2025-09-22 15:02:03'),
(10, 'App\\Models\\Usuario', 5, 'auth_token', 'a54ad8d0e743445702abef9199ea5055d3e70c1398e01f1eb1e32c3eac7b631c', '[]', NULL, '2025-09-22 19:27:56', '2025-09-22 19:12:56', '2025-09-22 19:12:56'),
(11, 'App\\Models\\Usuario', 5, 'auth_token', 'a1102753045504e640d77e619322d96fbf56177177801af6531f61c2f726640f', '[]', '2025-09-22 19:19:23', '2025-09-22 19:29:42', '2025-09-22 19:14:42', '2025-09-22 19:19:23'),
(12, 'App\\Models\\Usuario', 5, 'auth_token', '98e3a085be3768d655f55349096daaa83a1687f2116c0298d045215eb2b6aaa2', '[]', NULL, '2025-09-22 19:31:13', '2025-09-22 19:16:13', '2025-09-22 19:16:13'),
(13, 'App\\Models\\Usuario', 5, 'auth_token', '1ca6c48d4584f6cef4a25abe6eedcb0b50911a6cb72448b972f1daa46ed6b841', '[]', NULL, '2025-09-24 23:17:06', '2025-09-24 23:02:06', '2025-09-24 23:02:06'),
(14, 'App\\Models\\Usuario', 5, 'auth_token', '8999b9b72f31bfb68d2d765eb3068be7e0f09bb84a0df5f98c4c8b3f7da7a259', '[]', NULL, '2025-09-24 23:17:10', '2025-09-24 23:02:10', '2025-09-24 23:02:10'),
(28, 'App\\Models\\Usuario', 5, 'auth_token', '3f9ef05627d62e04448bd93849042b84a999bf322fb28b46d755c91b315807fa', '[]', '2025-09-24 23:50:56', '2025-09-25 00:05:52', '2025-09-24 23:50:52', '2025-09-24 23:50:56'),
(37, 'App\\Models\\Usuario', 5, 'auth_token', 'd2cf5aee6128e074369911a90138c52bd964cd091ee5076ad31c780c37efba1a', '[]', '2025-09-29 18:31:47', '2025-09-29 18:46:42', '2025-09-29 18:31:42', '2025-09-29 18:31:47'),
(38, 'App\\Models\\Usuario', 5, 'auth_token', 'fc99ed20fa51321aa4deeacd0d31ff7ae9cd0d775d915cf6904e0f0a6d1e6e63', '[]', '2025-09-30 22:33:41', '2025-09-30 22:33:42', '2025-09-30 22:18:42', '2025-09-30 22:33:41'),
(39, 'App\\Models\\Usuario', 5, 'auth_token', '7a0417d6d3a572adbee8c01388dfc89bae31ccb7ed745087564ff10edce61c8c', '[]', '2025-09-30 22:54:52', '2025-09-30 22:55:18', '2025-09-30 22:40:18', '2025-09-30 22:54:52'),
(40, 'App\\Models\\Usuario', 5, 'auth_token', '574de078ff664b4cbaa6c13ffd6882dbf51eec7ee0e1376aff001152d35f7c88', '[]', '2025-09-30 23:09:32', '2025-09-30 23:12:42', '2025-09-30 22:57:42', '2025-09-30 23:09:32'),
(41, 'App\\Models\\Usuario', 5, 'auth_token', '2fef5ecda20a57cd864818862a2f9385ccfa3a29a24b25880e4bf2c05c70f00a', '[]', '2025-09-30 23:25:44', '2025-09-30 23:40:39', '2025-09-30 23:25:39', '2025-09-30 23:25:44'),
(42, 'App\\Models\\Usuario', 5, 'auth_token', '249eeaae360f9995e2613e9ecd633f52ae80c3d183e7380a946a392bb7c19b77', '[]', '2025-09-30 23:48:07', '2025-09-30 23:48:12', '2025-09-30 23:33:12', '2025-09-30 23:48:07'),
(43, 'App\\Models\\Usuario', 5, 'auth_token', 'fefc8c50019f029cdfbb90b60407856bb108a5572cd91a6dc55cc969938f1c7a', '[]', '2025-10-01 00:06:34', '2025-10-01 00:06:45', '2025-09-30 23:51:45', '2025-10-01 00:06:34'),
(51, 'App\\Models\\Usuario', 5, 'auth_token', '6a6e7912a483d5b1e536fea9d741887af7d84e3b71079fd4f827265ff39884ff', '[]', '2025-10-01 00:54:34', '2025-10-01 00:59:03', '2025-10-01 00:44:03', '2025-10-01 00:54:34'),
(54, 'App\\Models\\Usuario', 5, 'auth_token', '873640971a0a240bdf8a54965e327a90c2eb15fe2c882c335e9ed8a01f97ee8f', '[]', '2025-10-01 01:22:13', '2025-10-01 02:43:36', '2025-10-01 01:13:36', '2025-10-01 01:22:13'),
(55, 'App\\Models\\Usuario', 5, 'auth_token', '698410bd2a78c94e7d99da0b235d706cc8cdaecd40697c0bd3d6379d397b2767', '[]', '2025-10-01 01:26:13', '2025-10-01 02:53:59', '2025-10-01 01:23:59', '2025-10-01 01:26:13'),
(56, 'App\\Models\\Usuario', 5, 'auth_token', '02e3993ac4acfd869420435d1b076ea007a36935f58ec3cd442fa4235d4b6e89', '[]', '2025-10-01 01:27:36', '2025-10-01 02:56:26', '2025-10-01 01:26:26', '2025-10-01 01:27:36'),
(63, 'App\\Models\\Usuario', 5, 'auth_token', '3f04f4240928aa30cceedcf89681c810297c9f9e8e269a5a964d0b7e59093dca', '[]', '2025-10-01 01:54:35', '2025-10-01 03:23:49', '2025-10-01 01:53:49', '2025-10-01 01:54:35'),
(65, 'App\\Models\\Usuario', 5, 'auth_token', '9a052ee0487ed2af2911f300cdf5126a34fc1db7c6c954be0a527ab4098269e1', '[]', '2025-10-02 15:16:41', '2025-10-02 16:46:18', '2025-10-02 15:16:18', '2025-10-02 15:16:41'),
(71, 'App\\Models\\Usuario', 5, 'auth_token', 'a31634b4f9a2f9560bca9a74325ef49ec6094ce41b5ef2e565880482be356e99', '[]', '2025-10-02 15:42:04', '2025-10-02 15:52:36', '2025-10-02 15:37:36', '2025-10-02 15:42:04'),
(72, 'App\\Models\\Usuario', 5, 'auth_token', '91673ba35fcf891c33cb52a1ac9e2eb2abdf8605330fbc13ff0e3fd72d1a7d7a', '[]', '2025-10-02 16:03:01', '2025-10-02 16:13:24', '2025-10-02 15:58:24', '2025-10-02 16:03:01'),
(73, 'App\\Models\\Usuario', 5, 'auth_token', '35b8d802b3fba8655dad8373acb12c1569fc5edccc09073b2e7f6accdc187f96', '[]', '2025-10-02 16:13:50', '2025-10-02 16:22:37', '2025-10-02 16:07:37', '2025-10-02 16:13:50'),
(74, 'App\\Models\\Usuario', 5, 'auth_token', '7f3c9bd1ae1f620ae83354c399e566207f3a6b3082321f69ca3d9a4687e2e8f5', '[]', '2025-10-02 16:32:20', '2025-10-02 16:36:24', '2025-10-02 16:21:24', '2025-10-02 16:32:20'),
(75, 'App\\Models\\Usuario', 5, 'auth_token', '34ac5cc111a4efa9f95e7e898288a932df9f64ac2009f4341c8f02722bcf4a5e', '[]', '2025-10-02 16:29:29', '2025-10-02 16:44:08', '2025-10-02 16:29:08', '2025-10-02 16:29:29'),
(77, 'App\\Models\\Usuario', 5, 'auth_token', '1670ab2b586bfa73957b09846581c496cc88c104b80bfe507680041782e91d08', '[]', '2025-10-02 16:50:02', '2025-10-02 17:01:28', '2025-10-02 16:46:28', '2025-10-02 16:50:02'),
(88, 'App\\Models\\Usuario', 5, 'auth_token', 'f46d1a9209a81999ba8127001d863f0f0a5a87b785c0fa953f1bdd5863dd2f9a', '[]', '2025-10-02 17:40:55', '2025-10-02 17:55:32', '2025-10-02 17:40:32', '2025-10-02 17:40:55'),
(93, 'App\\Models\\Usuario', 5, 'auth_token', 'f3f4524b121b465e0186a5b2b89caf20b5312e2e897e274928d264e073f5c650', '[]', '2025-10-06 18:17:00', '2025-10-06 18:17:58', '2025-10-06 18:02:58', '2025-10-06 18:17:00'),
(94, 'App\\Models\\Usuario', 5, 'auth_token', 'f2d694a6b1f395ae8eb05e6e6f3d23f9d394b363095184f47c7478f01bc8a6a2', '[]', '2025-10-06 18:25:46', '2025-10-06 18:38:39', '2025-10-06 18:23:39', '2025-10-06 18:25:46'),
(102, 'App\\Models\\Usuario', 5, 'auth_token', '056308946586f04e7056bca1bf43238eafb58759243eb41035babfdb72088794', '[]', '2025-10-06 22:05:31', '2025-10-06 22:15:40', '2025-10-06 22:00:40', '2025-10-06 22:05:31'),
(111, 'App\\Models\\Usuario', 5, 'auth_token', '67f52492942a11e23224cfa7827bfbc3cda4004e10cba27525ed9ec0d7e16420', '[]', '2025-10-11 21:37:18', '2025-10-11 21:52:11', '2025-10-11 21:37:11', '2025-10-11 21:37:18'),
(118, 'App\\Models\\Usuario', 5, 'auth_token', 'c9d7bb116d66e61ead34ccf56c480bd8a197263e4856216ca32bb6112565cd86', '[]', '2025-10-13 15:15:23', '2025-10-13 15:28:01', '2025-10-13 15:13:01', '2025-10-13 15:15:23'),
(119, 'App\\Models\\Usuario', 5, 'auth_token', '03a27b742f47ab80e12cab6a708e65a35461eee506518861d71ef2472cfe4a04', '[]', '2025-10-13 15:29:44', '2025-10-13 15:44:40', '2025-10-13 15:29:40', '2025-10-13 15:29:44'),
(120, 'App\\Models\\Usuario', 5, 'auth_token', '18eaa949b36ad873c68357fb49f6f693b5d70d76b7bd868bb954c661fafd59a6', '[]', '2025-10-13 16:46:36', '2025-10-13 17:01:26', '2025-10-13 16:46:26', '2025-10-13 16:46:36'),
(121, 'App\\Models\\Usuario', 11, 'auth_token', '9e4f59d2fea393df8fbf42282ccb09f66cc4e22074ee70e6cf56a44d850f5585', '[]', '2026-09-10 01:08:50', '2026-09-10 01:22:55', '2026-09-10 01:07:56', '2026-09-10 01:08:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dfrnnPYwDOBDKxkJ6lH51ML68JFCoAdJ8VAwwzuw', NULL, '127.0.0.1', 'PostmanRuntime/7.46.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVI2SnU1SmhHZTJMWDlIemQyMENpZ0NiaUhRVXpKcElkdE9PZHgxSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1758332278),
('dQnddqUcBqFqyorbXDkZKq01iXjrRJbm4AGoS6YG', NULL, '127.0.0.1', 'PostmanRuntime/7.48.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidXJQYmlBcXFhbDVEV0ZabVA2SXFNQmpnRU9HOGZaaDNJOTBTUTR5SiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1759421631);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `rol` varchar(20) NOT NULL DEFAULT 'usuario',
  `estatus` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido_paterno`, `apellido_materno`, `correo`, `password`, `telefono`, `rol`, `estatus`, `created_at`, `updated_at`) VALUES
(5, 'Joshua', 'Hernandez', 'Gonzalez', 'joshua@example.com', '$2y$12$70Fz26UV/BRzxT5gSgue5OOEyjwahHTggxt3mb4xY710PBX7wEEcO', '1234567899', 'admin', 1, '2025-09-20 01:41:20', '2025-10-01 00:18:50'),
(7, 'Manuel', 'Medrano', 'Chavez', 'manuel@example.com', '$2y$12$gHQWUIT5Mxnys3Nw50hAE.Rz40UZepqQUY/bwRiogLp8j8nEcrfuK', '6192038', 'usuario', 1, '2025-10-01 00:26:43', '2025-10-06 21:06:37'),
(8, 'Fatima', 'Hernandez', 'Gonzalez', 'fatima@example.com', '$2y$12$9Bs4REbxqPTOaLRLDyfBs.yJktXY0t7PzyeSn2FCPo93/A3C2FQVq', '1738912', 'admin', 1, '2025-10-01 00:34:35', '2025-10-11 21:36:40'),
(9, 'Rosa', 'Maria', 'Gonzalez', 'rosa@example.com', '$2y$12$41/LiO2screBv2Qhx4r6GODKiy01h9fq0BAAPc3BpkMEbjX1Ebaoy', '123124314', 'usuario', 1, '2025-10-01 00:36:13', '2025-10-11 21:36:04'),
(10, 'Juan Miguel', 'Perez', 'Retana', 'miguel.perez@durango.gob.mx', '$2y$12$dEta6KdOLqfCJatgmWA9bOzvH60ebWytO0AILDLR7t7Hk/mtpISNa', '6183006024', 'admin', 0, '2025-10-13 15:08:21', '2025-10-13 15:10:07'),
(11, 'Anthony', 'Hernandez', 'Gonzalez', 'joshua@ejemplo.com', '$2y$12$mGyMDvCqiSxeTvDWikjdweK4TrQY8WupYzzd5C7aCA6HamYMf0Z92', '1234567', 'admin', 1, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dispositivos_ip_unique` (`ip`),
  ADD UNIQUE KEY `dispositivos_mac_unique` (`mac`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `idfs`
--
ALTER TABLE `idfs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idfs_ip_unique` (`ip`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarios_correo_unique` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dispositivos`
--
ALTER TABLE `dispositivos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `idfs`
--
ALTER TABLE `idfs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
