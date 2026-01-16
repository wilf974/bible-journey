-- =============================================
-- Import data from CSV exports
-- Run this after 01-schema.sql
-- =============================================

-- Profiles
INSERT INTO public.profiles (id, user_id, display_name, avatar_url, current_xp, current_level, total_lessons_completed, current_streak, longest_streak, last_activity_date, lives, max_lives, created_at, updated_at, lives_updated_at, manna, pvp_wins, pvp_losses, pvp_draws) VALUES
('8f2f0a26-7539-47d0-8779-3af7c9551626', 'a3de56ed-45b3-4f19-9d7e-511f9e431695', 'Anne-Marie', NULL, 1159, 3, 0, 1, 1, '2026-01-15', 4, 5, '2026-01-15 20:49:24.826382+00', '2026-01-15 21:20:43.550945+00', '2026-01-15 21:19:24.826+00', 200, 0, 0, 0),
('594b4c63-c8e2-45dc-9ee2-c158a7b2fd87', '844c6dd3-7e51-46cd-a965-a149e05a0f36', 'Aurore', NULL, 103, 1, 0, 1, 1, '2026-01-15', 3, 5, '2026-01-15 11:25:02.942567+00', '2026-01-15 11:28:19.126717+00', '2026-01-15 11:25:02.942567+00', 55, 0, 0, 0),
('075416dc-559c-4764-8aa0-f6b301d9915d', 'fb243aa1-fb16-4a04-b4cf-2c6463840946', 'Sophie', NULL, 178, 1, 0, 1, 1, '2026-01-15', 3, 5, '2026-01-15 18:58:38.739214+00', '2026-01-15 19:09:13.695329+00', '2026-01-15 18:58:38.739214+00', 55, 0, 0, 0),
('db4f83fa-2f67-4038-a168-a949a72814a0', '0cf26847-1b58-4d45-8423-3bac817bb89e', 'Solange', NULL, 125, 1, 0, 1, 1, '2026-01-15', 5, 5, '2026-01-15 17:44:52.847364+00', '2026-01-15 19:19:56.197344+00', '2026-01-15 19:14:52.847+00', 66, 0, 0, 0),
('56c987c0-3209-4aff-8e28-9eb4f39bc2a6', '139306fe-4ee5-411f-966d-a86cf02a16da', 'Patrice', NULL, 1162, 3, 0, 1, 1, '2026-01-15', 3, 5, '2026-01-15 21:15:06.054132+00', '2026-01-15 21:37:57.481728+00', '2026-01-15 21:15:06.054132+00', 185, 0, 0, 0),
('7f0597ec-63ae-4915-97d5-9dbe6160e65c', '96ff41d6-7eeb-4889-99f3-58e526f9e5a1', 'Wilfred', NULL, 2203, 5, 0, 3, 3, '2026-01-16', 0, 5, '2026-01-14 06:10:33.470496+00', '2026-01-16 07:23:06.98716+00', '2026-01-16 07:03:45.597+00', 272, 0, 0, 0),
('bed83102-985d-4fc7-8000-b730ef7aab72', '3564f034-e3d2-46f2-9166-33e28f8fc308', 'Virginie', NULL, 128, 1, 0, 1, 1, '2026-01-16', 2, 5, '2026-01-16 06:59:41.119543+00', '2026-01-16 07:42:38.586912+00', '2026-01-16 07:29:41.119+00', 65, 0, 0, 0)
ON CONFLICT (user_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  current_xp = EXCLUDED.current_xp,
  current_level = EXCLUDED.current_level,
  lives = EXCLUDED.lives,
  manna = EXCLUDED.manna;

-- Leaderboard entries
INSERT INTO public.leaderboard_entries (id, user_id, week_start, xp_earned, lessons_completed, perfect_lessons, created_at, updated_at) VALUES
('d1a6f642-32c3-4af4-b43f-7369518141a0', 'a3de56ed-45b3-4f19-9d7e-511f9e431695', '2026-01-12', 1159, 30, 26, '2026-01-15 21:01:01.524164+00', '2026-01-15 21:20:43.677168+00'),
('925fd8ad-1334-4499-ab84-30d8323d72e5', '844c6dd3-7e51-46cd-a965-a149e05a0f36', '2026-01-12', 103, 1, 0, '2026-01-15 11:28:19.213223+00', '2026-01-15 11:28:19.213223+00'),
('b8de2bd0-0e6d-4527-850a-3816ad6cbf7c', 'fb243aa1-fb16-4a04-b4cf-2c6463840946', '2026-01-12', 178, 1, 1, '2026-01-15 19:09:13.875347+00', '2026-01-15 19:09:13.875347+00'),
('491174fe-9e6e-41c8-b653-1bbb821c46e5', '0cf26847-1b58-4d45-8423-3bac817bb89e', '2026-01-12', 20, 1, 1, '2026-01-15 19:15:42.142048+00', '2026-01-15 19:15:42.142048+00'),
('8e76f341-4259-4d4e-824c-913373ec8d14', '139306fe-4ee5-411f-966d-a86cf02a16da', '2026-01-12', 1162, 27, 23, '2026-01-15 21:17:45.775455+00', '2026-01-15 21:37:57.631379+00'),
('220b5567-64d9-4048-ad82-27ad5c955fe4', '3564f034-e3d2-46f2-9166-33e28f8fc308', '2026-01-12', 128, 3, 2, '2026-01-16 07:03:01.768239+00', '2026-01-16 07:08:42.374357+00'),
('14681f1c-0df9-43fe-a965-f22742d495c6', '96ff41d6-7eeb-4889-99f3-58e526f9e5a1', '2026-01-12', 1623, 39, 29, '2026-01-14 18:38:36.975857+00', '2026-01-16 07:22:38.4864+00')
ON CONFLICT (user_id, week_start) DO UPDATE SET
  xp_earned = EXCLUDED.xp_earned,
  lessons_completed = EXCLUDED.lessons_completed,
  perfect_lessons = EXCLUDED.perfect_lessons;

-- Player challenges
INSERT INTO public.player_challenges (id, challenger_id, opponent_id, status, book_id, chapter, challenger_score, opponent_score, challenger_answers, opponent_answers, total_questions, current_question, winner_id, xp_reward, manna_reward, created_at, started_at, completed_at, updated_at) VALUES
('bd72eb65-81a4-4cd8-8b30-3b6c9a6a2b58', '96ff41d6-7eeb-4889-99f3-58e526f9e5a1', NULL, 'cancelled', NULL, NULL, 0, 0, 0, 0, 5, 0, NULL, 50, 10, '2026-01-14 13:14:34.755295+00', NULL, NULL, '2026-01-14 13:14:38.772103+00'),
('481df8ba-2684-4204-a2fd-6f097168696c', '96ff41d6-7eeb-4889-99f3-58e526f9e5a1', NULL, 'waiting', NULL, NULL, 0, 0, 0, 0, 5, 0, NULL, 50, 10, '2026-01-15 11:49:09.389027+00', NULL, NULL, '2026-01-15 11:49:09.389027+00')
ON CONFLICT (id) DO NOTHING;
