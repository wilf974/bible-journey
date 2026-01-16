#!/bin/bash
# Import CSV data into PostgreSQL
# This script is run after the database is initialized

echo "Importing CSV data..."

# Wait for tables to be created
sleep 5

# CSV files are semicolon-delimited
# Import profiles
psql -U postgres -d postgres -c "\COPY public.profiles(id,user_id,display_name,avatar_url,current_xp,current_level,total_lessons_completed,current_streak,longest_streak,last_activity_date,lives,max_lives,created_at,updated_at,lives_updated_at,manna,pvp_wins,pvp_losses,pvp_draws) FROM '/csv-data/profiles-export-2026-01-16_08-44-53.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');"

# Import leaderboard_entries
psql -U postgres -d postgres -c "\COPY public.leaderboard_entries(id,user_id,week_start,xp_earned,lessons_completed,perfect_lessons,created_at,updated_at) FROM '/csv-data/leaderboard_entries-export-2026-01-16_08-44-39.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');"

# Import daily_challenges
psql -U postgres -d postgres -c "\COPY public.daily_challenges(id,user_id,challenge_date,challenge_type,target_value,current_value,completed,reward_xp,reward_manna,claimed,created_at) FROM '/csv-data/daily_challenges-export-2026-01-16_08-44-31.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');"

# Import user_progress
psql -U postgres -d postgres -c "\COPY public.user_progress(id,user_id,book_id,chapter_id,lesson_id,completed,score,xp_earned,completed_at,created_at) FROM '/csv-data/user_progress-export-2026-01-16_08-44-59.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');"

# Import player_challenges
psql -U postgres -d postgres -c "\COPY public.player_challenges(id,challenger_id,opponent_id,status,book_id,chapter,challenger_score,opponent_score,challenger_answers,opponent_answers,total_questions,current_question,winner_id,xp_reward,manna_reward,created_at,started_at,completed_at,updated_at) FROM '/csv-data/player_challenges-export-2026-01-16_08-44-44.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', NULL '');"

echo "CSV import complete!"
