-- =============================================
-- Bible Journey - Migrated Questions
-- Generated on 2026-01-19T13:34:36.295Z
-- Total questions: 500
-- =============================================

-- Delete existing questions (but keep sample ones if needed)
-- TRUNCATE public.questions CASCADE;


-- =============================================
-- GENESIS (102 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('gen1-1', 'genesis', 1, 'multiple_choice', 'Qu''a créé Dieu au commencement ?', 'Au commencement, Dieu créa les cieux et la terre.', 'Genèse 1:1', NULL, 10),
('gen1-2', 'genesis', 1, 'multiple_choice', 'Quelle était la première chose que Dieu a créée au premier jour ?', NULL, NULL, NULL, 10),
('gen1-3', 'genesis', 1, 'multiple_choice', 'Combien de jours a pris la création selon la Genèse ?', NULL, NULL, NULL, 10),
('gen1-4', 'genesis', 1, 'multiple_choice', 'Qu''a fait Dieu le septième jour ?', NULL, NULL, NULL, 10),
('gen1-5', 'genesis', 1, 'multiple_choice', 'À l''image de qui l''homme a-t-il été créé ?', 'Dieu créa l''homme à son image', 'Genèse 1:27', NULL, 10),
('gen1-6', 'genesis', 1, 'multiple_choice', 'Qu''a créé Dieu le deuxième jour ?', NULL, NULL, NULL, 10),
('gen1-7', 'genesis', 1, 'multiple_choice', 'Quel jour Dieu a-t-il créé le soleil, la lune et les étoiles ?', NULL, NULL, NULL, 10),
('gen1-8', 'genesis', 1, 'multiple_choice', 'Qu''a créé Dieu le cinquième jour ?', NULL, NULL, NULL, 10),
('gen1-9', 'genesis', 1, 'multiple_choice', 'Quelle bénédiction Dieu a-t-il donnée à l''humanité ?', NULL, NULL, NULL, 10),
('gen1-10', 'genesis', 1, 'multiple_choice', 'Comment Dieu qualifiait-il sa création à la fin de chaque jour ?', NULL, NULL, NULL, 10),
('gen2-1', 'genesis', 2, 'multiple_choice', 'Comment s''appelait le jardin où Dieu plaça l''homme ?', NULL, NULL, NULL, 10),
('gen2-2', 'genesis', 2, 'multiple_choice', 'Avec quoi Dieu a-t-il formé l''homme ?', NULL, NULL, NULL, 10),
('gen2-3', 'genesis', 2, 'multiple_choice', 'Quel arbre était interdit à l''homme de manger ?', NULL, NULL, NULL, 10),
('gen2-4', 'genesis', 2, 'multiple_choice', 'Comment Dieu a-t-il créé la femme ?', NULL, NULL, NULL, 10),
('gen2-5', 'genesis', 2, 'multiple_choice', 'Comment s''appelait la première femme ?', NULL, NULL, NULL, 10),
('gen3-1', 'genesis', 3, 'multiple_choice', 'Quel animal a tenté Ève dans le jardin ?', NULL, NULL, NULL, 10),
('gen3-2', 'genesis', 3, 'multiple_choice', 'Quelle était la conséquence du péché d''Adam et Ève ?', NULL, NULL, NULL, 10),
('gen3-3', 'genesis', 3, 'multiple_choice', 'Qu''est-ce qu''Adam et Ève ont fait pour se couvrir après avoir péché ?', NULL, NULL, NULL, 10),
('gen4-1', 'genesis', 4, 'multiple_choice', 'Qui était le premier fils d''Adam et Ève ?', NULL, NULL, NULL, 10),
('gen4-2', 'genesis', 4, 'multiple_choice', 'Quel était le métier d''Abel ?', NULL, NULL, NULL, 10),
('gen4-3', 'genesis', 4, 'multiple_choice', 'Pourquoi Caïn tua-t-il son frère Abel ?', NULL, NULL, NULL, 10),
('gen4-4', 'genesis', 4, 'multiple_choice', 'Quel signe Dieu mit-il sur Caïn ?', NULL, NULL, NULL, 10),
('gen6-1', 'genesis', 6, 'multiple_choice', 'Pourquoi Dieu décida-t-il d''envoyer le déluge ?', NULL, NULL, NULL, 10),
('gen6-2', 'genesis', 6, 'multiple_choice', 'Qui Dieu choisit-il pour construire l''arche ?', NULL, NULL, NULL, 10),
('gen7-1', 'genesis', 7, 'multiple_choice', 'Combien de jours et de nuits la pluie tomba-t-elle ?', NULL, NULL, NULL, 10),
('gen7-2', 'genesis', 7, 'multiple_choice', 'Combien de personnes étaient dans l''arche ?', NULL, NULL, NULL, 10),
('gen8-1', 'genesis', 8, 'multiple_choice', 'Quel oiseau Noé envoya-t-il en premier ?', NULL, NULL, NULL, 10),
('gen8-2', 'genesis', 8, 'multiple_choice', 'Qu''est-ce que la colombe rapporta à Noé ?', NULL, NULL, NULL, 10),
('gen9-1', 'genesis', 9, 'multiple_choice', 'Quel signe d''alliance Dieu donna-t-il à Noé ?', NULL, NULL, NULL, 10),
('gen11-1', 'genesis', 11, 'multiple_choice', 'Pourquoi les hommes construisirent-ils la tour de Babel ?', NULL, NULL, NULL, 10),
('gen11-2', 'genesis', 11, 'multiple_choice', 'Comment Dieu empêcha-t-il la construction de la tour de Babel ?', NULL, NULL, NULL, 10),
('gen12-1', 'genesis', 12, 'multiple_choice', 'Quel était le nom original d''Abraham ?', NULL, NULL, NULL, 10),
('gen12-2', 'genesis', 12, 'multiple_choice', 'D''où Dieu appela-t-il Abraham ?', NULL, NULL, NULL, 10),
('gen18-1', 'genesis', 18, 'multiple_choice', 'Comment s''appelait l''épouse d''Abraham ?', NULL, NULL, NULL, 10),
('gen21-1', 'genesis', 21, 'multiple_choice', 'Quel était le nom du fils promis à Abraham et Sara ?', NULL, NULL, NULL, 10),
('gen22-1', 'genesis', 22, 'multiple_choice', 'Qu''est-ce que Dieu demanda à Abraham de sacrifier sur le mont Morija ?', NULL, NULL, NULL, 10),
('gen22-2', 'genesis', 22, 'multiple_choice', 'Qu''est-ce qu''Abraham trouva pour remplacer Isaac ?', NULL, NULL, NULL, 10),
('gen25-1', 'genesis', 25, 'multiple_choice', 'Qui étaient les jumeaux d''Isaac et Rébecca ?', NULL, NULL, NULL, 10),
('gen25-2', 'genesis', 25, 'multiple_choice', 'Qu''est-ce qu''Ésaü vendit à Jacob contre un plat de lentilles ?', NULL, NULL, NULL, 10),
('gen28-1', 'genesis', 28, 'multiple_choice', 'Qu''est-ce que Jacob vit en rêve à Béthel ?', NULL, NULL, NULL, 10),
('gen37-1', 'genesis', 37, 'multiple_choice', 'Quel vêtement spécial Jacob donna-t-il à Joseph ?', NULL, NULL, NULL, 10),
('gen37-2', 'genesis', 37, 'multiple_choice', 'Qu''est-ce que les frères de Joseph firent de lui ?', NULL, NULL, NULL, 10),
('gen39-1', 'genesis', 39, 'multiple_choice', 'Qui acheta Joseph en Égypte ?', NULL, NULL, NULL, 10),
('gen41-1', 'genesis', 41, 'multiple_choice', 'Qu''est-ce que Joseph interpréta pour Pharaon ?', NULL, NULL, NULL, 10),
('gen41-2', 'genesis', 41, 'multiple_choice', 'Combien d''années de famine Joseph prédit-il ?', NULL, NULL, NULL, 10),
('gen45-1', 'genesis', 45, 'multiple_choice', 'Comment Joseph réagit-il quand ses frères vinrent en Égypte ?', NULL, NULL, NULL, 10),
('gen5-1', 'genesis', 5, 'multiple_choice', 'Quel âge avait Adam quand il mourut ?', NULL, NULL, NULL, 10),
('gen5-2', 'genesis', 5, 'multiple_choice', 'Qui est l''homme qui a vécu le plus longtemps dans la Bible ?', NULL, NULL, NULL, 10),
('gen5-3', 'genesis', 5, 'multiple_choice', 'Qu''est-il arrivé à Énoch ?', NULL, NULL, NULL, 10),
('gen6-3', 'genesis', 6, 'multiple_choice', 'En quel matériau l''arche devait-elle être construite ?', NULL, NULL, NULL, 10),
('gen9-2', 'genesis', 9, 'multiple_choice', 'Quels étaient les trois fils de Noé ?', NULL, NULL, NULL, 10),
('gen10-1', 'genesis', 10, 'multiple_choice', 'De quel fils de Noé descendent les peuples de Canaan ?', NULL, NULL, NULL, 10),
('gen10-2', 'genesis', 10, 'multiple_choice', 'Qui était Nimrod ?', NULL, NULL, NULL, 10),
('gen12-3', 'genesis', 12, 'multiple_choice', 'Quelle promesse Dieu fit-il à Abram ?', NULL, NULL, NULL, 10),
('gen13-1', 'genesis', 13, 'multiple_choice', 'Pourquoi Abram et Lot durent-ils se séparer ?', NULL, NULL, NULL, 10),
('gen13-2', 'genesis', 13, 'multiple_choice', 'Quelle région Lot choisit-il pour s''installer ?', NULL, NULL, NULL, 10),
('gen14-1', 'genesis', 14, 'multiple_choice', 'Qui était Melchisédek ?', NULL, NULL, NULL, 10),
('gen15-1', 'genesis', 15, 'multiple_choice', 'À quoi Dieu compara-t-il la descendance d''Abraham ?', NULL, NULL, NULL, 10),
('gen16-1', 'genesis', 16, 'multiple_choice', 'Comment s''appelait la servante de Sara qui donna un fils à Abraham ?', NULL, NULL, NULL, 10),
('gen16-2', 'genesis', 16, 'multiple_choice', 'Comment s''appelait le fils d''Abraham et d''Agar ?', NULL, NULL, NULL, 10),
('gen17-1', 'genesis', 17, 'multiple_choice', 'Quel signe de l''alliance Dieu institua-t-il avec Abraham ?', NULL, NULL, NULL, 10),
('gen18-2', 'genesis', 18, 'multiple_choice', 'Abraham a négocié avec Dieu pour épargner Sodome s''il y avait au moins...', NULL, NULL, NULL, 10),
('gen19-1', 'genesis', 19, 'multiple_choice', 'Qui fut sauvé de la destruction de Sodome ?', NULL, NULL, NULL, 10),
('gen19-2', 'genesis', 19, 'multiple_choice', 'En quoi la femme de Lot fut-elle transformée ?', NULL, NULL, NULL, 10),
('gen20-1', 'genesis', 20, 'multiple_choice', 'Qui était Abimélec ?', NULL, NULL, NULL, 10),
('gen20-2', 'genesis', 20, 'multiple_choice', 'Pourquoi Abraham dit-il que Sara était sa sœur à Abimélec ?', NULL, NULL, NULL, 10),
('gen23-1', 'genesis', 23, 'multiple_choice', 'Où Sara fut-elle enterrée ?', NULL, NULL, NULL, 10),
('gen24-1', 'genesis', 24, 'multiple_choice', 'Qui le serviteur d''Abraham trouva-t-il comme épouse pour Isaac ?', NULL, NULL, NULL, 10),
('gen26-1', 'genesis', 26, 'multiple_choice', 'Pourquoi Isaac dit-il que Rébecca était sa sœur ?', NULL, NULL, NULL, 10),
('gen26-2', 'genesis', 26, 'multiple_choice', 'Comment Dieu bénit-il Isaac à Guérar ?', NULL, NULL, NULL, 10),
('gen27-1', 'genesis', 27, 'multiple_choice', 'Comment Jacob trompa-t-il son père Isaac pour obtenir la bénédiction ?', NULL, NULL, NULL, 10),
('gen29-1', 'genesis', 29, 'multiple_choice', 'Combien d''années Jacob travailla-t-il pour épouser Rachel ?', NULL, NULL, NULL, 10),
('gen29-2', 'genesis', 29, 'multiple_choice', 'Qui Laban donna-t-il d''abord à Jacob à la place de Rachel ?', NULL, NULL, NULL, 10),
('gen30-1', 'genesis', 30, 'multiple_choice', 'Pourquoi Rachel était-elle jalouse de Léa ?', NULL, NULL, NULL, 10),
('gen30-2', 'genesis', 30, 'multiple_choice', 'Comment Jacob devint-il riche chez Laban ?', NULL, NULL, NULL, 10),
('gen31-1', 'genesis', 31, 'multiple_choice', 'Pourquoi Jacob décida-t-il de quitter Laban ?', NULL, NULL, NULL, 10),
('gen31-2', 'genesis', 31, 'multiple_choice', 'Que Rachel déroba-t-elle à son père Laban ?', NULL, NULL, NULL, 10),
('gen32-1', 'genesis', 32, 'multiple_choice', 'Avec qui Jacob lutta-t-il toute la nuit au gué de Jabbok ?', NULL, NULL, NULL, 10),
('gen32-2', 'genesis', 32, 'multiple_choice', 'Quel nouveau nom Jacob reçut-il après avoir lutté ?', NULL, NULL, NULL, 10),
('gen33-1', 'genesis', 33, 'multiple_choice', 'Comment Ésaü réagit-il quand il retrouva Jacob ?', NULL, NULL, NULL, 10),
('gen33-2', 'genesis', 33, 'multiple_choice', 'Où Jacob s''installa-t-il après avoir quitté Ésaü ?', NULL, NULL, NULL, 10),
('gen34-1', 'genesis', 34, 'multiple_choice', 'Comment s''appelait la fille de Jacob ?', NULL, NULL, NULL, 10),
('gen34-2', 'genesis', 34, 'multiple_choice', 'Quels fils de Jacob vengèrent leur sœur Dina ?', NULL, NULL, NULL, 10),
('gen35-1', 'genesis', 35, 'multiple_choice', 'Combien de fils Jacob eut-il au total ?', NULL, NULL, NULL, 10),
('gen36-1', 'genesis', 36, 'multiple_choice', 'Quel autre nom désigne Ésaü ?', NULL, NULL, NULL, 10),
('gen36-2', 'genesis', 36, 'multiple_choice', 'Dans quelle région Ésaü s''installa-t-il ?', NULL, NULL, NULL, 10),
('gen37-3', 'genesis', 37, 'multiple_choice', 'À qui les frères de Joseph le vendirent-ils ?', NULL, NULL, NULL, 10),
('gen38-1', 'genesis', 38, 'multiple_choice', 'Qui était Tamar ?', NULL, NULL, NULL, 10),
('gen38-2', 'genesis', 38, 'multiple_choice', 'Quels jumeaux naquirent de Juda et Tamar ?', NULL, NULL, NULL, 10),
('gen39-2', 'genesis', 39, 'multiple_choice', 'Pourquoi Joseph fut-il mis en prison ?', NULL, NULL, NULL, 10),
('gen40-1', 'genesis', 40, 'multiple_choice', 'Quels serviteurs de Pharaon Joseph interpréta-t-il les rêves en prison ?', NULL, NULL, NULL, 10),
('gen42-1', 'genesis', 42, 'multiple_choice', 'Pourquoi les frères de Joseph vinrent-ils en Égypte ?', NULL, NULL, NULL, 10),
('gen43-1', 'genesis', 43, 'multiple_choice', 'Qui se porta garant pour Benjamin auprès de Jacob ?', NULL, NULL, NULL, 10),
('gen43-2', 'genesis', 43, 'multiple_choice', 'Comment Joseph réagit-il en voyant Benjamin ?', NULL, NULL, NULL, 10),
('gen44-1', 'genesis', 44, 'multiple_choice', 'Dans le sac de quel frère la coupe de Joseph fut-elle cachée ?', NULL, NULL, NULL, 10),
('gen46-1', 'genesis', 46, 'multiple_choice', 'Dans quelle région d''Égypte la famille de Jacob s''installa-t-elle ?', NULL, NULL, NULL, 10),
('gen47-1', 'genesis', 47, 'multiple_choice', 'Quel âge avait Jacob quand il se présenta devant Pharaon ?', NULL, NULL, NULL, 10),
('gen47-2', 'genesis', 47, 'multiple_choice', 'Que fit Joseph pour acheter toute la terre d''Égypte pour Pharaon ?', NULL, NULL, NULL, 10),
('gen48-1', 'genesis', 48, 'multiple_choice', 'Comment s''appellent les deux fils de Joseph que Jacob a bénis ?', NULL, NULL, NULL, 10),
('gen48-2', 'genesis', 48, 'multiple_choice', 'Pourquoi Joseph essaya-t-il de corriger Jacob lors de la bénédiction ?', NULL, NULL, NULL, 10),
('gen49-1', 'genesis', 49, 'multiple_choice', 'De quelle tribu le Messie devait-il venir selon la bénédiction de Jacob ?', NULL, NULL, NULL, 10),
('gen50-1', 'genesis', 50, 'multiple_choice', 'Quelle belle déclaration Joseph fit-il à ses frères qui avaient peur de lui ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- EXODUS (55 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('exo1-1', 'exodus', 1, 'multiple_choice', 'Pourquoi Pharaon ordonna-t-il de tuer les nouveau-nés hébreux mâles ?', NULL, NULL, NULL, 10),
('exo2-1', 'exodus', 2, 'multiple_choice', 'Où la mère de Moïse le cacha-t-elle ?', NULL, NULL, NULL, 10),
('exo2-2', 'exodus', 2, 'multiple_choice', 'Qui trouva Moïse dans le Nil ?', NULL, NULL, NULL, 10),
('exo3-1', 'exodus', 3, 'multiple_choice', 'Comment Dieu apparut-il à Moïse ?', NULL, NULL, NULL, 10),
('exo3-2', 'exodus', 3, 'multiple_choice', 'Quel nom Dieu se donna-t-il à Moïse ?', NULL, NULL, NULL, 10),
('exo7-1', 'exodus', 7, 'multiple_choice', 'Combien de plaies Dieu envoya-t-il sur l''Égypte ?', NULL, NULL, NULL, 10),
('exo12-1', 'exodus', 12, 'multiple_choice', 'Quelle fête commémore la sortie d''Égypte ?', NULL, NULL, NULL, 10),
('exo14-1', 'exodus', 14, 'multiple_choice', 'Quelle mer Moïse ouvrit-il pour permettre au peuple de passer ?', NULL, NULL, NULL, 10),
('exo20-1', 'exodus', 20, 'multiple_choice', 'Sur quelle montagne Moïse reçut-il les dix commandements ?', NULL, NULL, NULL, 10),
('exo20-2', 'exodus', 20, 'multiple_choice', 'Quel est le premier des dix commandements ?', NULL, NULL, NULL, 10),
('exod1-1', 'exodus', 1, 'multiple_choice', 'Pourquoi Pharaon ordonna-t-il de tuer les nouveau-nés hébreux ?', NULL, NULL, NULL, 10),
('exod2-1', 'exodus', 2, 'multiple_choice', 'Comment la mère de Moïse le sauva-t-elle ?', NULL, NULL, NULL, 10),
('exod2-2', 'exodus', 2, 'multiple_choice', 'Qui trouva Moïse dans la corbeille ?', NULL, NULL, NULL, 10),
('exod2-3', 'exodus', 2, 'multiple_choice', 'Que signifie le nom ''Moïse'' ?', NULL, NULL, NULL, 10),
('exod2-4', 'exodus', 2, 'multiple_choice', 'Pourquoi Moïse s''enfuit-il d''Égypte ?', NULL, NULL, NULL, 10),
('exod2-5', 'exodus', 2, 'multiple_choice', 'Dans quel pays Moïse s''enfuit-il ?', NULL, NULL, NULL, 10),
('exod3-1', 'exodus', 3, 'multiple_choice', 'Comment Dieu apparut-il à Moïse dans le désert ?', NULL, NULL, NULL, 10),
('exod3-2', 'exodus', 3, 'multiple_choice', 'Sur quelle montagne Moïse vit-il le buisson ardent ?', NULL, NULL, NULL, 10),
('exod3-3', 'exodus', 3, 'multiple_choice', 'Que Dieu ordonna-t-il à Moïse de faire devant le buisson ?', NULL, NULL, NULL, 10),
('exod3-4', 'exodus', 3, 'multiple_choice', 'Par quel nom Dieu se révéla-t-il à Moïse ?', NULL, NULL, NULL, 10),
('exod4-1', 'exodus', 4, 'multiple_choice', 'Quel signe Dieu donna-t-il à Moïse avec son bâton ?', NULL, NULL, NULL, 10),
('exod4-2', 'exodus', 4, 'multiple_choice', 'Qui devait parler à la place de Moïse qui se disait mauvais orateur ?', NULL, NULL, NULL, 10),
('exod7-1', 'exodus', 7, 'multiple_choice', 'Quelle fut la première plaie d''Égypte ?', NULL, NULL, NULL, 10),
('exod8-1', 'exodus', 8, 'multiple_choice', 'Quelle était la deuxième plaie d''Égypte ?', NULL, NULL, NULL, 10),
('exod8-2', 'exodus', 8, 'multiple_choice', 'Quelle plaie les magiciens égyptiens ne purent pas reproduire ?', NULL, NULL, NULL, 10),
('exod9-1', 'exodus', 9, 'multiple_choice', 'Quelle plaie causa des ulcères sur les hommes et les animaux ?', NULL, NULL, NULL, 10),
('exod9-2', 'exodus', 9, 'multiple_choice', 'Quelle plaie impliquait la grêle mêlée de feu ?', NULL, NULL, NULL, 10),
('exod10-1', 'exodus', 10, 'multiple_choice', 'Quelle plaie couvrit toute l''Égypte de sauterelles ?', NULL, NULL, NULL, 10),
('exod10-2', 'exodus', 10, 'multiple_choice', 'Combien de jours durèrent les ténèbres en Égypte ?', NULL, NULL, NULL, 10),
('exod11-1', 'exodus', 11, 'multiple_choice', 'Quelle fut la dixième et dernière plaie ?', NULL, NULL, NULL, 10),
('exod12-1', 'exodus', 12, 'multiple_choice', 'Qu''est-ce que les Hébreux devaient mettre sur les montants de leurs portes ?', NULL, NULL, NULL, 10),
('exod12-2', 'exodus', 12, 'multiple_choice', 'Comment s''appelle la fête qui commémore la sortie d''Égypte ?', NULL, NULL, NULL, 10),
('exod12-3', 'exodus', 12, 'multiple_choice', 'Quel type de pain les Hébreux devaient-ils manger lors de la Pâque ?', NULL, NULL, NULL, 10),
('exod13-1', 'exodus', 13, 'multiple_choice', 'Comment Dieu guidait-il les Israélites le jour ?', NULL, NULL, NULL, 10),
('exod13-2', 'exodus', 13, 'multiple_choice', 'Comment Dieu guidait-il les Israélites la nuit ?', NULL, NULL, NULL, 10),
('exod14-1', 'exodus', 14, 'multiple_choice', 'Quelle mer Dieu ouvrit-il pour que les Israélites passent ?', NULL, NULL, NULL, 10),
('exod14-2', 'exodus', 14, 'multiple_choice', 'Qu''arriva-t-il à l''armée égyptienne dans la mer Rouge ?', NULL, NULL, NULL, 10),
('exod15-1', 'exodus', 15, 'multiple_choice', 'Que firent Moïse et les Israélites après avoir traversé la mer ?', NULL, NULL, NULL, 10),
('exod16-1', 'exodus', 16, 'multiple_choice', 'Comment s''appelait le pain que Dieu envoyait du ciel ?', NULL, NULL, NULL, 10),
('exod16-2', 'exodus', 16, 'multiple_choice', 'Quelle viande Dieu envoya-t-il le soir aux Israélites ?', NULL, NULL, NULL, 10),
('exod17-1', 'exodus', 17, 'multiple_choice', 'Comment Moïse fit-il jaillir de l''eau à Rephidim ?', NULL, NULL, NULL, 10),
('exod17-2', 'exodus', 17, 'multiple_choice', 'Qui soutenait les bras de Moïse pendant la bataille contre Amalek ?', NULL, NULL, NULL, 10),
('exod19-1', 'exodus', 19, 'multiple_choice', 'Sur quelle montagne Dieu donna-t-il la Loi à Moïse ?', NULL, NULL, NULL, 10),
('exod20-1', 'exodus', 20, 'multiple_choice', 'Quel est le premier des Dix Commandements ?', NULL, NULL, NULL, 10),
('exod20-2', 'exodus', 20, 'multiple_choice', 'Quel jour devons-nous sanctifier selon le quatrième commandement ?', NULL, NULL, NULL, 10),
('exod20-3', 'exodus', 20, 'multiple_choice', 'Quel commandement a une promesse de bénédiction ?', NULL, NULL, NULL, 10),
('exod20-4', 'exodus', 20, 'multiple_choice', 'Combien y a-t-il de commandements donnés sur le mont Sinaï ?', NULL, NULL, NULL, 10),
('exod32-1', 'exodus', 32, 'multiple_choice', 'Quelle idole le peuple fabriqua-t-il pendant l''absence de Moïse ?', NULL, NULL, NULL, 10),
('exod32-2', 'exodus', 32, 'multiple_choice', 'Que fit Moïse des tables de la loi quand il vit le veau d''or ?', NULL, NULL, NULL, 10),
('exod32-3', 'exodus', 32, 'multiple_choice', 'Qui avait fabriqué le veau d''or ?', NULL, NULL, NULL, 10),
('exod25-1', 'exodus', 25, 'multiple_choice', 'Comment s''appelait la tente portable de Dieu ?', NULL, NULL, NULL, 10),
('exod25-2', 'exodus', 25, 'multiple_choice', 'Que contenait l''Arche de l''Alliance ?', NULL, NULL, NULL, 10),
('exod26-1', 'exodus', 26, 'multiple_choice', 'Qu''est-ce qui séparait le lieu saint du lieu très saint ?', NULL, NULL, NULL, 10),
('exod28-1', 'exodus', 28, 'multiple_choice', 'Combien de pierres précieuses étaient sur le pectoral du grand prêtre ?', NULL, NULL, NULL, 10),
('exod40-1', 'exodus', 40, 'multiple_choice', 'Que se passa-t-il quand le Tabernacle fut achevé ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- MATTHEW (78 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('mat1-1', 'matthew', 1, 'multiple_choice', 'Qui était la mère de Jésus ?', NULL, NULL, NULL, 10),
('mat2-1', 'matthew', 2, 'multiple_choice', 'Où Jésus est-il né ?', NULL, NULL, NULL, 10),
('mat2-2', 'matthew', 2, 'multiple_choice', 'Qui suivit l''étoile pour trouver Jésus ?', NULL, NULL, NULL, 10),
('mat3-1', 'matthew', 3, 'multiple_choice', 'Qui baptisa Jésus ?', NULL, NULL, NULL, 10),
('mat4-1', 'matthew', 4, 'multiple_choice', 'Combien de jours Jésus jeûna-t-il dans le désert ?', NULL, NULL, NULL, 10),
('mat5-1', 'matthew', 5, 'multiple_choice', 'Comment s''appelle le célèbre discours de Jésus sur la montagne ?', NULL, NULL, NULL, 10),
('mat5-2', 'matthew', 5, 'multiple_choice', 'Selon les Béatitudes, qui héritera la terre ?', NULL, NULL, NULL, 10),
('mat6-1', 'matthew', 6, 'multiple_choice', 'Quelle prière Jésus enseigna-t-il à ses disciples ?', NULL, NULL, NULL, 10),
('mat7-1', 'matthew', 7, 'multiple_choice', 'Selon Jésus, pourquoi ne devons-nous pas juger les autres ?', NULL, NULL, NULL, 10),
('mat7-2', 'matthew', 7, 'multiple_choice', 'À quelle image Jésus compare-t-il les faux prophètes ?', NULL, NULL, NULL, 10),
('mat8-1', 'matthew', 8, 'multiple_choice', 'Quelle maladie le lépreux a-t-il demandé à Jésus de guérir ?', NULL, NULL, NULL, 10),
('mat8-2', 'matthew', 8, 'multiple_choice', 'Pourquoi Jésus s''étonna-t-il de la foi du centurion ?', NULL, NULL, NULL, 10),
('mat9-1', 'matthew', 9, 'multiple_choice', 'Qu''a dit Jésus au paralytique avant de le guérir ?', NULL, NULL, NULL, 10),
('mat9-2', 'matthew', 9, 'multiple_choice', 'Quel était le métier de Matthieu avant de suivre Jésus ?', NULL, NULL, NULL, 10),
('mat10-1', 'matthew', 10, 'multiple_choice', 'Combien de disciples Jésus a-t-il envoyés en mission ?', NULL, NULL, NULL, 10),
('mat10-2', 'matthew', 10, 'multiple_choice', 'Selon Jésus, comme quoi les disciples doivent-ils être envoyés au milieu des loups ?', NULL, NULL, NULL, 10),
('mat11-1', 'matthew', 11, 'multiple_choice', 'Que Jésus a-t-il dit de Jean-Baptiste ?', NULL, NULL, NULL, 10),
('mat11-2', 'matthew', 11, 'multiple_choice', 'Que promet Jésus à ceux qui sont fatigués et chargés ?', NULL, NULL, NULL, 10),
('mat12-1', 'matthew', 12, 'multiple_choice', 'Pourquoi les pharisiens critiquèrent-ils les disciples de Jésus ?', NULL, NULL, NULL, 10),
('mat12-2', 'matthew', 12, 'multiple_choice', 'Selon Jésus, quel est le seul péché qui ne sera pas pardonné ?', NULL, NULL, NULL, 10),
('mat13-1', 'matthew', 13, 'multiple_choice', 'Dans la parabole du semeur, que représente la bonne terre ?', NULL, NULL, NULL, 10),
('mat13-2', 'matthew', 13, 'multiple_choice', 'À quoi Jésus compare-t-il le royaume des cieux dans la parabole du grain de moutarde ?', NULL, NULL, NULL, 10),
('mat14-1', 'matthew', 14, 'multiple_choice', 'Combien de personnes Jésus nourrit-il avec cinq pains et deux poissons ?', NULL, NULL, NULL, 10),
('mat14-2', 'matthew', 14, 'multiple_choice', 'Quel disciple marcha sur l''eau vers Jésus ?', NULL, NULL, NULL, 10),
('mat16-1', 'matthew', 16, 'multiple_choice', 'Qu''est-ce que Pierre confessa à propos de Jésus ?', NULL, NULL, NULL, 10),
('mat15-1', 'matthew', 15, 'multiple_choice', 'Selon Jésus, qu''est-ce qui souille l''homme ?', NULL, NULL, NULL, 10),
('mat15-2', 'matthew', 15, 'multiple_choice', 'De quelle origine était la femme qui supplia Jésus pour sa fille ?', NULL, NULL, NULL, 10),
('mat17-1', 'matthew', 17, 'multiple_choice', 'Quels prophètes sont apparus avec Jésus lors de la Transfiguration ?', NULL, NULL, NULL, 10),
('mat17-2', 'matthew', 17, 'multiple_choice', 'À quoi Jésus compare-t-il la foi nécessaire pour déplacer une montagne ?', NULL, NULL, NULL, 10),
('mat18-1', 'matthew', 18, 'multiple_choice', 'Qui est le plus grand dans le royaume des cieux selon Jésus ?', NULL, NULL, NULL, 10),
('mat18-2', 'matthew', 18, 'multiple_choice', 'Combien de fois Pierre devait-il pardonner à son frère selon Jésus ?', NULL, NULL, NULL, 10),
('mat19-1', 'matthew', 19, 'multiple_choice', 'Que Jésus dit-il sur les enfants ?', NULL, NULL, NULL, 10),
('mat19-2', 'matthew', 19, 'multiple_choice', 'Qu''est-ce qui est difficile pour un riche selon Jésus ?', NULL, NULL, NULL, 10),
('mat20-1', 'matthew', 20, 'multiple_choice', 'Dans la parabole des ouvriers, combien reçoivent ceux embauchés en dernier ?', NULL, NULL, NULL, 10),
('mat20-2', 'matthew', 20, 'multiple_choice', 'Que demanda la mère des fils de Zébédée pour ses fils ?', NULL, NULL, NULL, 10),
('mat21-1', 'matthew', 21, 'multiple_choice', 'Sur quel animal Jésus est-il entré à Jérusalem ?', NULL, NULL, NULL, 10),
('mat21-2', 'matthew', 21, 'multiple_choice', 'Que criait la foule lors de l''entrée de Jésus à Jérusalem ?', NULL, NULL, NULL, 10),
('mat22-1', 'matthew', 22, 'multiple_choice', 'Quel est le plus grand commandement selon Jésus ?', NULL, NULL, NULL, 10),
('mat22-2', 'matthew', 22, 'multiple_choice', 'Que répondit Jésus sur le paiement de l''impôt à César ?', NULL, NULL, NULL, 10),
('mat23-1', 'matthew', 23, 'multiple_choice', 'Comment Jésus appelle-t-il les scribes et pharisiens hypocrites ?', NULL, NULL, NULL, 10),
('mat23-2', 'matthew', 23, 'multiple_choice', 'Qu''est-ce que les pharisiens négligeaient selon Jésus ?', NULL, NULL, NULL, 10),
('mat24-1', 'matthew', 24, 'multiple_choice', 'Que dit Jésus concernant le jour et l''heure de son retour ?', NULL, NULL, NULL, 10),
('mat24-2', 'matthew', 24, 'multiple_choice', 'Comment les disciples doivent-ils être selon Jésus ?', NULL, NULL, NULL, 10),
('mat25-1', 'matthew', 25, 'multiple_choice', 'Dans la parabole des dix vierges, combien étaient sages ?', NULL, NULL, NULL, 10),
('mat25-2', 'matthew', 25, 'multiple_choice', 'Dans la parabole des talents, que fait le serviteur avec un talent ?', NULL, NULL, NULL, 10),
('mat26-1', 'matthew', 26, 'multiple_choice', 'Pour combien de pièces d''argent Judas a-t-il trahi Jésus ?', NULL, NULL, NULL, 10),
('mat26-2', 'matthew', 26, 'multiple_choice', 'Où Jésus a-t-il prié avant son arrestation ?', NULL, NULL, NULL, 10),
('mat27-1', 'matthew', 27, 'multiple_choice', 'Que fit Pilate pour se déclarer innocent du sang de Jésus ?', NULL, NULL, NULL, 10),
('mat27-2', 'matthew', 27, 'multiple_choice', 'Quelles furent les dernières paroles de Jésus sur la croix selon Matthieu ?', NULL, NULL, NULL, 10),
('mat28-1', 'matthew', 28, 'multiple_choice', 'Qu''ont trouvé les femmes au tombeau de Jésus le matin de Pâques ?', NULL, NULL, NULL, 10),
('matt1-ext1', 'matthew', 1, 'multiple_choice', 'Combien de générations y a-t-il d''Abraham à David selon Matthieu ?', NULL, NULL, NULL, 10),
('matt2-ext1', 'matthew', 2, 'multiple_choice', 'Que signifie le nom ''Emmanuel'' ?', NULL, NULL, NULL, 10),
('matt2-ext2', 'matthew', 2, 'multiple_choice', 'De quel pays les mages vinrent-ils ?', NULL, NULL, NULL, 10),
('matt2-ext3', 'matthew', 2, 'multiple_choice', 'Quels cadeaux les mages offrirent-ils à Jésus ?', NULL, NULL, NULL, 10),
('matt3-ext1', 'matthew', 3, 'multiple_choice', 'De quoi Jean-Baptiste se nourrissait-il dans le désert ?', NULL, NULL, NULL, 10),
('matt4-ext1', 'matthew', 4, 'multiple_choice', 'Combien de jours Jésus jeûna-t-il dans le désert ?', NULL, NULL, NULL, 10),
('matt4-ext2', 'matthew', 4, 'multiple_choice', 'Combien de tentations Satan présenta-t-il à Jésus ?', NULL, NULL, NULL, 10),
('matt5-ext1', 'matthew', 5, 'multiple_choice', 'Comment s''appelle le discours de Jésus dans Matthieu 5-7 ?', NULL, NULL, NULL, 10),
('matt5-ext2', 'matthew', 5, 'multiple_choice', 'Qui héritera la terre selon les Béatitudes ?', NULL, NULL, NULL, 10),
('matt6-ext1', 'matthew', 6, 'multiple_choice', 'Où Jésus dit-il d''amasser des trésors ?', NULL, NULL, NULL, 10),
('matt6-ext2', 'matthew', 6, 'multiple_choice', 'Que dit Jésus sur le fait de servir deux maîtres ?', NULL, NULL, NULL, 10),
('matt7-ext1', 'matthew', 7, 'multiple_choice', 'À quoi Jésus compare-t-il celui qui met en pratique ses paroles ?', NULL, NULL, NULL, 10),
('matt8-ext1', 'matthew', 8, 'multiple_choice', 'Quel officier romain impressionna Jésus par sa foi ?', NULL, NULL, NULL, 10),
('matt9-ext1', 'matthew', 9, 'multiple_choice', 'Comment s''appelait le collecteur d''impôts que Jésus appela à le suivre ?', NULL, NULL, NULL, 10),
('matt10-ext1', 'matthew', 10, 'multiple_choice', 'Combien de disciples Jésus envoya-t-il en mission ?', NULL, NULL, NULL, 10),
('matt13-ext1', 'matthew', 13, 'multiple_choice', 'Dans la parabole du semeur, que représente la bonne terre ?', NULL, NULL, NULL, 10),
('matt14-ext1', 'matthew', 14, 'multiple_choice', 'Avec combien de pains et de poissons Jésus nourrit-il 5000 hommes ?', NULL, NULL, NULL, 10),
('matt14-ext2', 'matthew', 14, 'multiple_choice', 'Qui marcha sur l''eau avec Jésus avant de couler ?', NULL, NULL, NULL, 10),
('matt16-ext1', 'matthew', 16, 'multiple_choice', 'Que Pierre confessa-t-il au sujet de Jésus à Césarée de Philippe ?', NULL, NULL, NULL, 10),
('matt17-ext1', 'matthew', 17, 'multiple_choice', 'Qui apparut avec Jésus lors de la Transfiguration ?', NULL, NULL, NULL, 10),
('matt18-ext1', 'matthew', 18, 'multiple_choice', 'Combien de fois devons-nous pardonner selon Jésus ?', NULL, NULL, NULL, 10),
('matt19-ext1', 'matthew', 19, 'multiple_choice', 'À quoi Jésus compare-t-il un riche entrant dans le royaume de Dieu ?', NULL, NULL, NULL, 10),
('matt21-ext1', 'matthew', 21, 'multiple_choice', 'Sur quel animal Jésus entra-t-il à Jérusalem ?', NULL, NULL, NULL, 10),
('matt22-ext1', 'matthew', 22, 'multiple_choice', 'Quel est le plus grand commandement selon Jésus ?', NULL, NULL, NULL, 10),
('matt25-ext1', 'matthew', 25, 'multiple_choice', 'Combien de vierges attendaient l''époux dans la parabole ?', NULL, NULL, NULL, 10),
('matt26-ext1', 'matthew', 26, 'multiple_choice', 'Pour combien de pièces d''argent Judas trahit-il Jésus ?', NULL, NULL, NULL, 10),
('matt27-ext1', 'matthew', 27, 'multiple_choice', 'Qui porta la croix de Jésus ?', NULL, NULL, NULL, 10),
('matt28-ext1', 'matthew', 28, 'multiple_choice', 'Qui découvrit en premier le tombeau vide ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- JOHN (23 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('joh1-1', 'john', 1, 'multiple_choice', 'Comment Jean décrit-il Jésus au début de son évangile ?', 'Au commencement était la Parole', NULL, NULL, 10),
('joh2-1', 'john', 2, 'multiple_choice', 'Quel fut le premier miracle de Jésus ?', NULL, NULL, NULL, 10),
('joh3-1', 'john', 3, 'multiple_choice', 'Qui vint voir Jésus de nuit pour lui poser des questions ?', NULL, NULL, NULL, 10),
('joh3-2', 'john', 3, 'multiple_choice', 'Complétez : ''Car Dieu a tant aimé le monde qu''il a donné...''', NULL, NULL, NULL, 10),
('joh11-1', 'john', 11, 'multiple_choice', 'Qui Jésus ressuscita-t-il d''entre les morts à Béthanie ?', NULL, NULL, NULL, 10),
('joh14-1', 'john', 14, 'multiple_choice', 'Jésus dit : ''Je suis le chemin, la vérité et...''', NULL, NULL, NULL, 10),
('joh20-1', 'john', 20, 'multiple_choice', 'Quel disciple douta de la résurrection de Jésus ?', NULL, NULL, NULL, 10),
('john1-ext1', 'john', 1, 'multiple_choice', 'Comment Jean appelle-t-il Jésus au début de son Évangile ?', NULL, NULL, NULL, 10),
('john2-ext1', 'john', 2, 'multiple_choice', 'Où Jésus accomplit-il son premier miracle ?', NULL, NULL, NULL, 10),
('john3-ext1', 'john', 3, 'multiple_choice', 'Qui vint voir Jésus de nuit pour lui poser des questions ?', NULL, NULL, NULL, 10),
('john3-ext2', 'john', 3, 'multiple_choice', 'Quel verset est appelé ''l''Évangile en miniature'' ?', NULL, NULL, NULL, 10),
('john4-ext1', 'john', 4, 'multiple_choice', 'De quelle nationalité était la femme au puits de Jacob ?', NULL, NULL, NULL, 10),
('john6-ext1', 'john', 6, 'multiple_choice', 'Comment Jésus se décrit-il en Jean 6 ?', NULL, NULL, NULL, 10),
('john8-ext1', 'john', 8, 'multiple_choice', 'Que dit Jésus à la femme adultère après que les accusateurs soient partis ?', NULL, NULL, NULL, 10),
('john10-ext1', 'john', 10, 'multiple_choice', 'Comment Jésus se décrit-il en Jean 10 ?', NULL, NULL, NULL, 10),
('john11-ext1', 'john', 11, 'multiple_choice', 'Depuis combien de jours Lazare était-il mort quand Jésus arriva ?', NULL, NULL, NULL, 10),
('john11-ext2', 'john', 11, 'multiple_choice', 'Quel est le verset le plus court de la Bible ?', NULL, NULL, NULL, 10),
('john13-ext1', 'john', 13, 'multiple_choice', 'Que fit Jésus pour ses disciples lors de la dernière Cène ?', NULL, NULL, NULL, 10),
('john14-ext1', 'john', 14, 'multiple_choice', 'Que dit Jésus en Jean 14:6 ?', NULL, NULL, NULL, 10),
('john15-ext1', 'john', 15, 'multiple_choice', 'À quoi Jésus compare-t-il sa relation avec les disciples ?', NULL, NULL, NULL, 10),
('john19-ext1', 'john', 19, 'multiple_choice', 'Quelles étaient les dernières paroles de Jésus sur la croix selon Jean ?', NULL, NULL, NULL, 10),
('john20-ext1', 'john', 20, 'multiple_choice', 'Quel disciple doutait de la résurrection jusqu''à voir Jésus ?', NULL, NULL, NULL, 10),
('john21-ext1', 'john', 21, 'multiple_choice', 'Combien de fois Jésus demanda-t-il à Pierre s''il l''aimait ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- LEVITICUS (5 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('lev1-1', 'leviticus', 1, 'multiple_choice', 'Quel type de sacrifice est décrit au chapitre 1 du Lévitique ?', NULL, NULL, NULL, 10),
('lev1-2', 'leviticus', 1, 'multiple_choice', 'Quels animaux pouvaient être offerts en holocauste ?', NULL, NULL, NULL, 10),
('lev11-1', 'leviticus', 11, 'multiple_choice', 'Quels sont les deux critères pour qu''un animal terrestre soit considéré pur ?', NULL, NULL, NULL, 10),
('lev16-1', 'leviticus', 16, 'multiple_choice', 'Que signifie le Jour des Expiations (Yom Kippour) ?', NULL, NULL, NULL, 10),
('lev19-1', 'leviticus', 19, 'multiple_choice', 'Quel commandement célèbre trouve-t-on en Lévitique 19:18 ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- NUMBERS (7 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('num1-1', 'numbers', 1, 'multiple_choice', 'Pourquoi le livre des Nombres porte-t-il ce nom ?', NULL, NULL, NULL, 10),
('num13-1', 'numbers', 13, 'multiple_choice', 'Combien d''espions Moïse envoya-t-il explorer Canaan ?', NULL, NULL, NULL, 10),
('num13-2', 'numbers', 13, 'multiple_choice', 'Quels deux espions ont encouragé le peuple à conquérir Canaan ?', NULL, NULL, NULL, 10),
('num14-1', 'numbers', 14, 'multiple_choice', 'Combien d''années Israël a-t-il erré dans le désert à cause de leur incrédulité ?', NULL, NULL, NULL, 10),
('num21-1', 'numbers', 21, 'multiple_choice', 'Qu''a fabriqué Moïse pour guérir le peuple des morsures de serpents ?', NULL, NULL, NULL, 10),
('num22-1', 'numbers', 22, 'multiple_choice', 'Quel prophète a été engagé pour maudire Israël mais les a bénis à la place ?', NULL, NULL, NULL, 10),
('num22-2', 'numbers', 22, 'multiple_choice', 'Quel animal a parlé à Balaam ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- DEUTERONOMY (7 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('deut1-1', 'deuteronomy', 1, 'multiple_choice', 'Que signifie le mot ''Deutéronome'' ?', NULL, NULL, NULL, 10),
('deut5-1', 'deuteronomy', 5, 'multiple_choice', 'Quel chapitre du Deutéronome répète les Dix Commandements ?', NULL, NULL, NULL, 10),
('deut6-1', 'deuteronomy', 6, 'multiple_choice', 'Comment s''appelle la prière juive la plus importante tirée de Deutéronome 6:4 ?', NULL, NULL, NULL, 10),
('deut6-2', 'deuteronomy', 6, 'multiple_choice', 'Comment devons-nous aimer Dieu selon Deutéronome 6:5 ?', NULL, NULL, NULL, 10),
('deut34-1', 'deuteronomy', 34, 'multiple_choice', 'Où Moïse est-il mort ?', NULL, NULL, NULL, 10),
('deut34-2', 'deuteronomy', 34, 'multiple_choice', 'Quel âge avait Moïse à sa mort ?', NULL, NULL, NULL, 10),
('deut34-3', 'deuteronomy', 34, 'multiple_choice', 'Qui a succédé à Moïse comme chef d''Israël ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- JOSHUA (12 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('josh1-1', 'joshua', 1, 'multiple_choice', 'Quelle promesse Dieu a-t-il faite à Josué au début du livre ?', NULL, NULL, NULL, 10),
('josh2-1', 'joshua', 2, 'multiple_choice', 'Comment s''appelait la femme qui a caché les espions à Jéricho ?', NULL, NULL, NULL, 10),
('josh3-1', 'joshua', 3, 'multiple_choice', 'Quel fleuve les Israélites ont-ils traversé pour entrer en Canaan ?', NULL, NULL, NULL, 10),
('josh6-1', 'joshua', 6, 'multiple_choice', 'Combien de fois les Israélites ont-ils fait le tour de Jéricho le septième jour ?', NULL, NULL, NULL, 10),
('josh6-2', 'joshua', 6, 'multiple_choice', 'Comment les murailles de Jéricho sont-elles tombées ?', NULL, NULL, NULL, 10),
('josh10-1', 'joshua', 10, 'multiple_choice', 'Quel miracle Dieu a-t-il accompli pour Josué pendant la bataille ?', NULL, NULL, NULL, 10),
('josh1-ext1', 'joshua', 1, 'multiple_choice', 'Combien de fois Dieu dit-il à Josué ''Fortifie-toi et prends courage'' ?', NULL, NULL, NULL, 10),
('josh2-ext1', 'joshua', 2, 'multiple_choice', 'Quel signe Rahab devait-elle mettre à sa fenêtre ?', NULL, NULL, NULL, 10),
('josh4-ext1', 'joshua', 4, 'multiple_choice', 'Combien de pierres les Israélites prirent-ils du Jourdain ?', NULL, NULL, NULL, 10),
('josh5-ext1', 'joshua', 5, 'multiple_choice', 'Qui apparut à Josué avec une épée avant la conquête de Jéricho ?', NULL, NULL, NULL, 10),
('josh7-ext1', 'joshua', 7, 'multiple_choice', 'Pourquoi Israël fut-il vaincu à Aï ?', NULL, NULL, NULL, 10),
('josh24-ext1', 'joshua', 24, 'multiple_choice', 'Quelle célèbre déclaration Josué fit-il au peuple ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- JUDGES (14 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('judg2-1', 'judges', 2, 'multiple_choice', 'Quel cycle se répète dans le livre des Juges ?', NULL, NULL, NULL, 10),
('judg4-1', 'judges', 4, 'multiple_choice', 'Qui était la seule femme juge d''Israël mentionnée dans la Bible ?', NULL, NULL, NULL, 10),
('judg6-1', 'judges', 6, 'multiple_choice', 'Comment Gédéon a-t-il testé Dieu ?', NULL, NULL, NULL, 10),
('judg7-1', 'judges', 7, 'multiple_choice', 'Combien de soldats Gédéon avait-il pour combattre les Madianites ?', NULL, NULL, NULL, 10),
('judg13-1', 'judges', 13, 'multiple_choice', 'Samson était consacré dès sa naissance comme...', NULL, NULL, NULL, 10),
('judg16-1', 'judges', 16, 'multiple_choice', 'Où résidait la force de Samson ?', NULL, NULL, NULL, 10),
('judg16-2', 'judges', 16, 'multiple_choice', 'Qui a trahi Samson en révélant le secret de sa force ?', NULL, NULL, NULL, 10),
('judg3-ext1', 'judges', 3, 'multiple_choice', 'Quel juge était gaucher et tua le roi Églon ?', NULL, NULL, NULL, 10),
('judg4-ext1', 'judges', 4, 'multiple_choice', 'Quelle femme tua le général Sisera avec un piquet de tente ?', NULL, NULL, NULL, 10),
('judg7-ext1', 'judges', 7, 'multiple_choice', 'Avec quelles armes les 300 hommes de Gédéon combattirent-ils ?', NULL, NULL, NULL, 10),
('judg11-ext1', 'judges', 11, 'multiple_choice', 'Quel vœu imprudent Jephté fit-il à Dieu ?', NULL, NULL, NULL, 10),
('judg14-ext1', 'judges', 14, 'multiple_choice', 'Quelle énigme Samson posa-t-il aux Philistins ?', NULL, NULL, NULL, 10),
('judg15-ext1', 'judges', 15, 'multiple_choice', 'Avec quelle arme inhabituelle Samson tua-t-il 1000 Philistins ?', NULL, NULL, NULL, 10),
('judg16-ext1', 'judges', 16, 'multiple_choice', 'Comment Samson est-il mort ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- RUTH (5 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('ruth1-1', 'ruth', 1, 'multiple_choice', 'De quel pays Ruth était-elle originaire ?', NULL, NULL, NULL, 10),
('ruth1-2', 'ruth', 1, 'multiple_choice', 'Comment s''appelait la belle-mère de Ruth ?', NULL, NULL, NULL, 10),
('ruth1-3', 'ruth', 1, 'multiple_choice', 'Quelle célèbre déclaration Ruth a-t-elle faite à Naomi ?', NULL, NULL, NULL, 10),
('ruth2-1', 'ruth', 2, 'multiple_choice', 'Qui était Boaz pour Naomi ?', NULL, NULL, NULL, 10),
('ruth4-1', 'ruth', 4, 'multiple_choice', 'Qui est né de l''union de Ruth et Boaz ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 1SAMUEL (15 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('1sam1-1', '1samuel', 1, 'multiple_choice', 'Quel vœu Anne a-t-elle fait à Dieu ?', NULL, NULL, NULL, 10),
('1sam3-1', '1samuel', 3, 'multiple_choice', 'Combien de fois Dieu a-t-il appelé Samuel avant qu''il comprenne ?', NULL, NULL, NULL, 10),
('1sam8-1', '1samuel', 8, 'multiple_choice', 'Pourquoi le peuple d''Israël voulait-il un roi ?', NULL, NULL, NULL, 10),
('1sam16-1', '1samuel', 16, 'multiple_choice', 'Pourquoi Dieu a-t-il choisi David comme roi ?', NULL, NULL, NULL, 10),
('1sam17-1', '1samuel', 17, 'multiple_choice', 'Quelle était la taille approximative de Goliath ?', NULL, NULL, NULL, 10),
('1sam17-2', '1samuel', 17, 'multiple_choice', 'Avec quelle arme David a-t-il vaincu Goliath ?', NULL, NULL, NULL, 10),
('1sam18-1', '1samuel', 18, 'multiple_choice', 'Qui est devenu le meilleur ami de David ?', NULL, NULL, NULL, 10),
('1sam1-ext1', '1samuel', 1, 'multiple_choice', 'Où Anne pria-t-elle pour avoir un enfant ?', NULL, NULL, NULL, 10),
('1sam4-ext1', '1samuel', 4, 'multiple_choice', 'Que capturèrent les Philistins lors de la bataille ?', NULL, NULL, NULL, 10),
('1sam9-ext1', '1samuel', 9, 'multiple_choice', 'Que cherchait Saül quand il rencontra Samuel ?', NULL, NULL, NULL, 10),
('1sam10-ext1', '1samuel', 10, 'multiple_choice', 'Comment Samuel désigna-t-il Saül comme roi ?', NULL, NULL, NULL, 10),
('1sam15-ext1', '1samuel', 15, 'multiple_choice', 'Pourquoi Dieu rejeta-t-il Saül comme roi ?', NULL, NULL, NULL, 10),
('1sam16-ext1', '1samuel', 16, 'multiple_choice', 'De quelle famille David était-il le plus jeune ?', NULL, NULL, NULL, 10),
('1sam17-ext1', '1samuel', 17, 'multiple_choice', 'Combien de pierres David prit-il pour affronter Goliath ?', NULL, NULL, NULL, 10),
('1sam24-ext1', '1samuel', 24, 'multiple_choice', 'Pourquoi David ne tua-t-il pas Saül dans la caverne ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 2SAMUEL (10 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('2sam5-1', '2samuel', 5, 'multiple_choice', 'Quelle ville David a-t-il conquise pour en faire sa capitale ?', NULL, NULL, NULL, 10),
('2sam6-1', '2samuel', 6, 'multiple_choice', 'Que David a-t-il ramené à Jérusalem avec grande joie ?', NULL, NULL, NULL, 10),
('2sam7-1', '2samuel', 7, 'multiple_choice', 'Quelle promesse Dieu a-t-il faite à David dans l''alliance davidique ?', NULL, NULL, NULL, 10),
('2sam11-1', '2samuel', 11, 'multiple_choice', 'Quel péché majeur David a-t-il commis avec Bathsheba ?', NULL, NULL, NULL, 10),
('2sam12-1', '2samuel', 12, 'multiple_choice', 'Quel prophète a confronté David au sujet de son péché ?', NULL, NULL, NULL, 10),
('2sam1-ext1', '2samuel', 1, 'multiple_choice', 'Comment David réagit-il à la mort de Saül ?', NULL, NULL, NULL, 10),
('2sam9-ext1', '2samuel', 9, 'multiple_choice', 'Quel descendant de Saül David traita-t-il avec bonté ?', NULL, NULL, NULL, 10),
('2sam15-ext1', '2samuel', 15, 'multiple_choice', 'Quel fils de David se révolta contre lui ?', NULL, NULL, NULL, 10),
('2sam18-ext1', '2samuel', 18, 'multiple_choice', 'Comment Absalom mourut-il ?', NULL, NULL, NULL, 10),
('2sam22-ext1', '2samuel', 22, 'multiple_choice', 'Quel type de texte David composa-t-il en 2 Samuel 22 ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 1KINGS (14 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('1kings3-1', '1kings', 3, 'multiple_choice', 'Que Salomon a-t-il demandé à Dieu ?', NULL, NULL, NULL, 10),
('1kings3-2', '1kings', 3, 'multiple_choice', 'Comment Salomon a-t-il résolu le conflit des deux femmes réclamant le même enfant ?', NULL, NULL, NULL, 10),
('1kings6-1', '1kings', 6, 'multiple_choice', 'Qu''a construit Salomon pour Dieu ?', NULL, NULL, NULL, 10),
('1kings11-1', '1kings', 11, 'multiple_choice', 'Qu''est-ce qui a détourné le cœur de Salomon de Dieu ?', NULL, NULL, NULL, 10),
('1kings18-1', '1kings', 18, 'multiple_choice', 'Sur quelle montagne Élie a-t-il défié les prophètes de Baal ?', NULL, NULL, NULL, 10),
('1kings18-2', '1kings', 18, 'multiple_choice', 'Comment le sacrifice d''Élie a-t-il été consumé ?', NULL, NULL, NULL, 10),
('1kings1-ext1', '1kings', 1, 'multiple_choice', 'Qui essaya de devenir roi à la place de Salomon ?', NULL, NULL, NULL, 10),
('1kings6-ext1', '1kings', 6, 'multiple_choice', 'Combien d''années Salomon mit-il à construire le Temple ?', NULL, NULL, NULL, 10),
('1kings10-ext1', '1kings', 10, 'multiple_choice', 'Quelle reine vint tester la sagesse de Salomon ?', NULL, NULL, NULL, 10),
('1kings11-ext1', '1kings', 11, 'multiple_choice', 'Combien de femmes et de concubines Salomon avait-il ?', NULL, NULL, NULL, 10),
('1kings12-ext1', '1kings', 12, 'multiple_choice', 'En combien de royaumes Israël fut-il divisé après Salomon ?', NULL, NULL, NULL, 10),
('1kings17-ext1', '1kings', 17, 'multiple_choice', 'Qui nourrissait Élie près du torrent de Kérith ?', NULL, NULL, NULL, 10),
('1kings18-ext1', '1kings', 18, 'multiple_choice', 'Combien de prophètes de Baal Élie affronta-t-il au mont Carmel ?', NULL, NULL, NULL, 10),
('1kings19-ext1', '1kings', 19, 'multiple_choice', 'Comment Dieu parla-t-il à Élie à la montagne ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 2KINGS (12 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('2kings2-1', '2kings', 2, 'multiple_choice', 'Comment Élie a-t-il été enlevé au ciel ?', NULL, NULL, NULL, 10),
('2kings2-2', '2kings', 2, 'multiple_choice', 'Qu''Élisée a-t-il demandé à Élie avant son départ ?', NULL, NULL, NULL, 10),
('2kings5-1', '2kings', 5, 'multiple_choice', 'De quelle maladie Naaman a-t-il été guéri ?', NULL, NULL, NULL, 10),
('2kings5-2', '2kings', 5, 'multiple_choice', 'Combien de fois Naaman devait-il se plonger dans le Jourdain ?', NULL, NULL, NULL, 10),
('2kings17-1', '2kings', 17, 'multiple_choice', 'Qui a conquis le royaume d''Israël (nord) ?', NULL, NULL, NULL, 10),
('2kings25-1', '2kings', 25, 'multiple_choice', 'Qui a détruit le Temple de Salomon et déporté Juda ?', NULL, NULL, NULL, 10),
('2kings2-ext1', '2kings', 2, 'multiple_choice', 'Comment Élisée divisa-t-il les eaux du Jourdain après le départ d''Élie ?', NULL, NULL, NULL, 10),
('2kings2-ext2', '2kings', 2, 'multiple_choice', 'Qu''est-ce qu''Élisée ramassa après l''enlèvement d''Élie ?', NULL, NULL, NULL, 10),
('2kings4-ext1', '2kings', 4, 'multiple_choice', 'Quel miracle Élisée accomplit-il pour la veuve endettée ?', NULL, NULL, NULL, 10),
('2kings5-ext1', '2kings', 5, 'multiple_choice', 'Quel général fut guéri de la lèpre par Élisée ?', NULL, NULL, NULL, 10),
('2kings5-ext2', '2kings', 5, 'multiple_choice', 'Quelle fut la réaction initiale de Naaman face aux instructions d''Élisée ?', NULL, NULL, NULL, 10),
('2kings6-ext1', '2kings', 6, 'multiple_choice', 'Que fit Élisée pour le fer de hache tombé dans l''eau ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- JOB (10 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('job1-1', 'job', 1, 'multiple_choice', 'Comment Dieu décrivait-il Job ?', NULL, NULL, NULL, 10),
('job1-2', 'job', 1, 'multiple_choice', 'Qui a demandé à Dieu la permission d''éprouver Job ?', NULL, NULL, NULL, 10),
('job2-1', 'job', 2, 'multiple_choice', 'Quel conseil la femme de Job lui a-t-elle donné ?', NULL, NULL, NULL, 10),
('job38-1', 'job', 38, 'multiple_choice', 'Comment Dieu a-t-il finalement répondu à Job ?', NULL, NULL, NULL, 10),
('job42-1', 'job', 42, 'multiple_choice', 'Comment Dieu a-t-il restauré Job à la fin ?', NULL, NULL, NULL, 10),
('job1-ext1', 'job', 1, 'multiple_choice', 'Combien de chameaux Job possédait-il au début du livre ?', NULL, NULL, NULL, 10),
('job1-ext2', 'job', 1, 'multiple_choice', 'Combien d''enfants Job avait-il au début du livre ?', NULL, NULL, NULL, 10),
('job2-ext1', 'job', 2, 'multiple_choice', 'Combien d''amis vinrent consoler Job dans sa souffrance ?', NULL, NULL, NULL, 10),
('job38-ext1', 'job', 38, 'multiple_choice', 'Quelle première question Dieu posa-t-il à Job ?', NULL, NULL, NULL, 10),
('job42-ext1', 'job', 42, 'multiple_choice', 'Combien d''années Job vécut-il après ses épreuves ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PSALMS (7 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('ps1-1', 'psalms', 1, 'multiple_choice', 'À quoi est comparé l''homme heureux dans le Psaume 1 ?', NULL, NULL, NULL, 10),
('ps23-1', 'psalms', 23, 'multiple_choice', 'Comment le Psaume 23 décrit-il l''Éternel ?', NULL, NULL, NULL, 10),
('ps23-2', 'psalms', 23, 'multiple_choice', 'Où l''Éternel fait-il reposer son peuple selon le Psaume 23 ?', NULL, NULL, NULL, 10),
('ps51-1', 'psalms', 51, 'multiple_choice', 'Après quel événement David a-t-il écrit le Psaume 51 ?', NULL, NULL, NULL, 10),
('ps91-1', 'psalms', 91, 'multiple_choice', 'Quelle protection est promise à celui qui demeure sous l''abri du Très-Haut ?', NULL, NULL, NULL, 10),
('ps119-1', 'psalms', 119, 'multiple_choice', 'Quel est le thème principal du Psaume 119, le plus long de la Bible ?', NULL, NULL, NULL, 10),
('ps150-1', 'psalms', 150, 'multiple_choice', 'Quel est le thème du Psaume 150, le dernier des Psaumes ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PROVERBS (5 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('prov1-1', 'proverbs', 1, 'multiple_choice', 'Quel est le commencement de la sagesse selon Proverbes ?', NULL, NULL, NULL, 10),
('prov3-1', 'proverbs', 3, 'multiple_choice', 'Que devons-nous faire selon Proverbes 3:5-6 ?', NULL, NULL, NULL, 10),
('prov22-1', 'proverbs', 22, 'multiple_choice', 'Quel célèbre verset parle de l''éducation des enfants ?', NULL, NULL, NULL, 10),
('prov27-1', 'proverbs', 27, 'multiple_choice', 'Que dit Proverbes sur la fierté pour le lendemain ?', NULL, NULL, NULL, 10),
('prov31-1', 'proverbs', 31, 'multiple_choice', 'Quel est le thème du chapitre 31 des Proverbes ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ECCLESIASTES (4 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('ecc1-1', 'ecclesiastes', 1, 'multiple_choice', 'Quelle expression célèbre répète souvent l''Ecclésiaste ?', NULL, NULL, NULL, 10),
('ecc3-1', 'ecclesiastes', 3, 'multiple_choice', 'Que dit Ecclésiaste 3 sur les temps et les moments ?', NULL, NULL, NULL, 10),
('ecc12-1', 'ecclesiastes', 12, 'multiple_choice', 'Quelle est la conclusion finale du livre de l''Ecclésiaste ?', NULL, NULL, NULL, 10),
('ecc4-1', 'ecclesiastes', 4, 'multiple_choice', 'Pourquoi deux valent-ils mieux qu''un selon l''Ecclésiaste ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ISAIAH (6 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('isa6-1', 'isaiah', 6, 'multiple_choice', 'Que criaient les séraphins dans la vision d''Ésaïe ?', NULL, NULL, NULL, 10),
('isa6-2', 'isaiah', 6, 'multiple_choice', 'Quelle a été la réponse d''Ésaïe quand Dieu a demandé qui envoyer ?', NULL, NULL, NULL, 10),
('isa7-1', 'isaiah', 7, 'multiple_choice', 'Quelle prophétie célèbre se trouve en Ésaïe 7:14 ?', NULL, NULL, NULL, 10),
('isa9-1', 'isaiah', 9, 'multiple_choice', 'Quels titres sont donnés à l''enfant en Ésaïe 9:6 ?', NULL, NULL, NULL, 10),
('isa40-1', 'isaiah', 40, 'multiple_choice', 'Quelle promesse est faite à ceux qui espèrent en l''Éternel ?', NULL, NULL, NULL, 10),
('isa53-1', 'isaiah', 53, 'multiple_choice', 'Que dit Ésaïe 53 sur le Serviteur souffrant ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- JEREMIAH (4 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('jer1-1', 'jeremiah', 1, 'multiple_choice', 'Quand Dieu a-t-il connu Jérémie selon Jérémie 1:5 ?', NULL, NULL, NULL, 10),
('jer1-2', 'jeremiah', 1, 'multiple_choice', 'Quelle excuse Jérémie a-t-il donnée quand Dieu l''a appelé ?', NULL, NULL, NULL, 10),
('jer29-1', 'jeremiah', 29, 'multiple_choice', 'Quels sont les projets de Dieu pour nous selon Jérémie 29:11 ?', NULL, NULL, NULL, 10),
('jer31-1', 'jeremiah', 31, 'multiple_choice', 'Quelle nouvelle alliance Dieu promet-il en Jérémie 31 ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- EZEKIEL (3 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('ezek1-1', 'ezekiel', 1, 'multiple_choice', 'Que voit Ézéchiel dans sa vision d''ouverture ?', NULL, NULL, NULL, 10),
('ezek37-1', 'ezekiel', 37, 'multiple_choice', 'Que représente la vision des ossements desséchés ?', NULL, NULL, NULL, 10),
('ezek37-2', 'ezekiel', 37, 'multiple_choice', 'Quelle question Dieu pose-t-il à Ézéchiel sur les ossements ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- DANIEL (6 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('dan1-1', 'daniel', 1, 'multiple_choice', 'Pourquoi Daniel a-t-il refusé la nourriture du roi ?', NULL, NULL, NULL, 10),
('dan2-1', 'daniel', 2, 'multiple_choice', 'Quel rêve Daniel a-t-il interprété pour Nebucadnetsar ?', NULL, NULL, NULL, 10),
('dan3-1', 'daniel', 3, 'multiple_choice', 'Qui a été jeté dans la fournaise ardente ?', NULL, NULL, NULL, 10),
('dan3-2', 'daniel', 3, 'multiple_choice', 'Combien de personnes le roi a-t-il vu dans la fournaise ?', NULL, NULL, NULL, 10),
('dan6-1', 'daniel', 6, 'multiple_choice', 'Pourquoi Daniel a-t-il été jeté dans la fosse aux lions ?', NULL, NULL, NULL, 10),
('dan6-2', 'daniel', 6, 'multiple_choice', 'Comment Daniel a-t-il survécu à la fosse aux lions ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- MARK (13 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('mark1-1', 'mark', 1, 'multiple_choice', 'Comment Marc décrit-il le début de son Évangile ?', NULL, NULL, NULL, 10),
('mark1-2', 'mark', 1, 'multiple_choice', 'Qui baptisait dans le désert au début de Marc ?', NULL, NULL, NULL, 10),
('mark2-1', 'mark', 2, 'multiple_choice', 'Comment les amis du paralytique l''ont-ils amené à Jésus ?', NULL, NULL, NULL, 10),
('mark4-1', 'mark', 4, 'multiple_choice', 'Que Jésus a-t-il dit pour calmer la tempête ?', NULL, NULL, NULL, 10),
('mark5-1', 'mark', 5, 'multiple_choice', 'Comment s''appelait la légion de démons que Jésus a chassée ?', NULL, NULL, NULL, 10),
('mark10-1', 'mark', 10, 'multiple_choice', 'Que Jésus a-t-il dit au jeune homme riche ?', NULL, NULL, NULL, 10),
('mark1-ext1', 'mark', 1, 'multiple_choice', 'Quel est le premier miracle de Jésus mentionné dans Marc ?', NULL, NULL, NULL, 10),
('mark2-ext1', 'mark', 2, 'multiple_choice', 'Que dit Jésus en premier au paralytique ?', NULL, NULL, NULL, 10),
('mark4-ext1', 'mark', 4, 'multiple_choice', 'Que dirent les disciples après que Jésus ait calmé la tempête ?', NULL, NULL, NULL, 10),
('mark5-ext1', 'mark', 5, 'multiple_choice', 'Où les démons demandèrent-ils à Jésus de les envoyer ?', NULL, NULL, NULL, 10),
('mark5-ext2', 'mark', 5, 'multiple_choice', 'Quel était l''âge de la fille de Jaïrus que Jésus ressuscita ?', NULL, NULL, NULL, 10),
('mark6-ext1', 'mark', 6, 'multiple_choice', 'Qui demanda la tête de Jean-Baptiste ?', NULL, NULL, NULL, 10),
('mark10-ext1', 'mark', 10, 'multiple_choice', 'Que dit Jésus des petits enfants ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- LUKE (21 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('luke1-1', 'luke', 1, 'multiple_choice', 'À qui Luc adresse-t-il son Évangile ?', NULL, NULL, NULL, 10),
('luke2-1', 'luke', 2, 'multiple_choice', 'Où Jésus est-il né selon Luc ?', NULL, NULL, NULL, 10),
('luke2-2', 'luke', 2, 'multiple_choice', 'Qui a été informé en premier de la naissance de Jésus ?', NULL, NULL, NULL, 10),
('luke10-1', 'luke', 10, 'multiple_choice', 'Quelle parabole célèbre Jésus raconte-t-il en Luc 10 ?', NULL, NULL, NULL, 10),
('luke15-1', 'luke', 15, 'multiple_choice', 'Quelles trois paraboles Jésus raconte-t-il en Luc 15 ?', NULL, NULL, NULL, 10),
('luke15-2', 'luke', 15, 'multiple_choice', 'Dans la parabole du fils prodigue, que fait le père quand son fils revient ?', NULL, NULL, NULL, 10),
('luke23-1', 'luke', 23, 'multiple_choice', 'Que Jésus a-t-il promis au brigand crucifié à côté de lui ?', NULL, NULL, NULL, 10),
('luke1-ext1', 'luke', 1, 'multiple_choice', 'Quel ange annonça à Marie qu''elle aurait un fils ?', NULL, NULL, NULL, 10),
('luke1-ext2', 'luke', 1, 'multiple_choice', 'Qui était la cousine de Marie qui attendait aussi un enfant ?', NULL, NULL, NULL, 10),
('luke2-ext1', 'luke', 2, 'multiple_choice', 'Où Marie déposa-t-elle Jésus après sa naissance ?', NULL, NULL, NULL, 10),
('luke2-ext2', 'luke', 2, 'multiple_choice', 'À qui les anges annoncèrent-ils la naissance de Jésus ?', NULL, NULL, NULL, 10),
('luke2-ext3', 'luke', 2, 'multiple_choice', 'Quel âge avait Jésus quand ses parents le retrouvèrent au Temple ?', NULL, NULL, NULL, 10),
('luke10-ext1', 'luke', 10, 'multiple_choice', 'Dans la parabole du bon Samaritain, qui passa sans aider le blessé ?', NULL, NULL, NULL, 10),
('luke15-ext1', 'luke', 15, 'multiple_choice', 'Combien de brebis le berger avait-il avant d''en perdre une ?', NULL, NULL, NULL, 10),
('luke15-ext2', 'luke', 15, 'multiple_choice', 'Que fit le fils prodigue avec son héritage ?', NULL, NULL, NULL, 10),
('luke15-ext3', 'luke', 15, 'multiple_choice', 'Quelle fut la réaction du frère aîné au retour du fils prodigue ?', NULL, NULL, NULL, 10),
('luke17-ext1', 'luke', 17, 'multiple_choice', 'Combien de lépreux Jésus guérit-il, et combien revinrent le remercier ?', NULL, NULL, NULL, 10),
('luke18-ext1', 'luke', 18, 'multiple_choice', 'Dans la parabole du pharisien et du publicain, qui rentra chez lui justifié ?', NULL, NULL, NULL, 10),
('luke19-ext1', 'luke', 19, 'multiple_choice', 'Dans quel arbre Zachée monta-t-il pour voir Jésus ?', NULL, NULL, NULL, 10),
('luke23-ext1', 'luke', 23, 'multiple_choice', 'Que dit le brigand repentant à l''autre qui insultait Jésus ?', NULL, NULL, NULL, 10),
('luke24-ext1', 'luke', 24, 'multiple_choice', 'Sur quelle route Jésus apparut-il à deux disciples après sa résurrection ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ACTS (19 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('acts1-1', 'acts', 1, 'multiple_choice', 'Que les disciples devaient-ils attendre à Jérusalem ?', NULL, NULL, NULL, 10),
('acts2-1', 'acts', 2, 'multiple_choice', 'Quel événement majeur s''est produit le jour de la Pentecôte ?', NULL, NULL, NULL, 10),
('acts2-2', 'acts', 2, 'multiple_choice', 'Sous quelle forme le Saint-Esprit est-il apparu à la Pentecôte ?', NULL, NULL, NULL, 10),
('acts2-3', 'acts', 2, 'multiple_choice', 'Combien de personnes se sont converties après le sermon de Pierre à la Pentecôte ?', NULL, NULL, NULL, 10),
('acts9-1', 'acts', 9, 'multiple_choice', 'Sur quelle route Saul (Paul) a-t-il rencontré Jésus ?', NULL, NULL, NULL, 10),
('acts9-2', 'acts', 9, 'multiple_choice', 'Que Jésus a-t-il demandé à Saul sur la route de Damas ?', NULL, NULL, NULL, 10),
('acts16-1', 'acts', 16, 'multiple_choice', 'Que Paul et Silas faisaient-ils en prison à Philippes ?', NULL, NULL, NULL, 10),
('acts16-2', 'acts', 16, 'multiple_choice', 'Quelle question le geôlier de Philippes a-t-il posée à Paul ?', NULL, NULL, NULL, 10),
('acts1-ext1', 'acts', 1, 'multiple_choice', 'Combien de jours Jésus apparut-il aux disciples après sa résurrection ?', NULL, NULL, NULL, 10),
('acts2-ext1', 'acts', 2, 'multiple_choice', 'Quel son accompagna la venue du Saint-Esprit à la Pentecôte ?', NULL, NULL, NULL, 10),
('acts2-ext2', 'acts', 2, 'multiple_choice', 'Quel don miraculeux les disciples reçurent-ils à la Pentecôte ?', NULL, NULL, NULL, 10),
('acts7-ext1', 'acts', 7, 'multiple_choice', 'Qui fut le premier martyr chrétien ?', NULL, NULL, NULL, 10),
('acts9-ext1', 'acts', 9, 'multiple_choice', 'Pendant combien de jours Saul fut-il aveugle après sa rencontre avec Jésus ?', NULL, NULL, NULL, 10),
('acts10-ext1', 'acts', 10, 'multiple_choice', 'Quel centurion romain reçut le Saint-Esprit avec sa maison ?', NULL, NULL, NULL, 10),
('acts12-ext1', 'acts', 12, 'multiple_choice', 'Comment Pierre fut-il libéré de prison ?', NULL, NULL, NULL, 10),
('acts16-ext1', 'acts', 16, 'multiple_choice', 'Qui fut la première convertie en Europe ?', NULL, NULL, NULL, 10),
('acts16-ext2', 'acts', 16, 'multiple_choice', 'Que répondirent Paul et Silas au geôlier de Philippes ?', NULL, NULL, NULL, 10),
('acts17-ext1', 'acts', 17, 'multiple_choice', 'Où Paul prêcha-t-il sur le Dieu inconnu ?', NULL, NULL, NULL, 10),
('acts27-ext1', 'acts', 27, 'multiple_choice', 'Combien de personnes étaient sur le bateau avec Paul lors du naufrage ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ROMANS (7 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('rom1-1', 'romans', 1, 'multiple_choice', 'Pourquoi Paul n''a-t-il pas honte de l''Évangile ?', NULL, NULL, NULL, 10),
('rom3-1', 'romans', 3, 'multiple_choice', 'Selon Romains 3:23, qui a péché ?', NULL, NULL, NULL, 10),
('rom5-1', 'romans', 5, 'multiple_choice', 'Comment Dieu prouve-t-il son amour envers nous ?', NULL, NULL, NULL, 10),
('rom6-1', 'romans', 6, 'multiple_choice', 'Quel est le salaire du péché selon Romains 6:23 ?', NULL, NULL, NULL, 10),
('rom8-1', 'romans', 8, 'multiple_choice', 'Selon Romains 8:28, pour qui toutes choses concourent au bien ?', NULL, NULL, NULL, 10),
('rom8-2', 'romans', 8, 'multiple_choice', 'Qu''est-ce qui peut nous séparer de l''amour de Christ ?', NULL, NULL, NULL, 10),
('rom12-1', 'romans', 12, 'multiple_choice', 'Comment devons-nous offrir nos corps selon Romains 12 ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 1CORINTHIANS (3 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('1cor13-1', '1corinthians', 13, 'multiple_choice', 'Quel est le plus grand des trois selon 1 Corinthiens 13 ?', NULL, NULL, NULL, 10),
('1cor13-2', '1corinthians', 13, 'multiple_choice', 'Selon 1 Corinthiens 13, l''amour...', NULL, NULL, NULL, 10),
('1cor15-1', '1corinthians', 15, 'multiple_choice', 'Quel est le dernier ennemi qui sera détruit ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 2CORINTHIANS (2 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('2cor5-1', '2corinthians', 5, 'multiple_choice', 'Qu''est-ce qui arrive si quelqu''un est en Christ ?', NULL, NULL, NULL, 10),
('2cor12-1', '2corinthians', 12, 'multiple_choice', 'Que Dieu a-t-il dit à Paul concernant sa faiblesse ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- GALATIANS (2 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('gal2-1', 'galatians', 2, 'multiple_choice', 'Comment vivons-nous maintenant selon Galates 2:20 ?', NULL, NULL, NULL, 10),
('gal5-1', 'galatians', 5, 'multiple_choice', 'Quel est le fruit de l''Esprit ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- EPHESIANS (3 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('eph2-1', 'ephesians', 2, 'multiple_choice', 'Comment sommes-nous sauvés selon Éphésiens 2:8 ?', NULL, NULL, NULL, 10),
('eph6-1', 'ephesians', 6, 'multiple_choice', 'Contre qui luttons-nous selon Éphésiens 6 ?', NULL, NULL, NULL, 10),
('eph6-2', 'ephesians', 6, 'multiple_choice', 'Que devons-nous revêtir selon Éphésiens 6 ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PHILIPPIANS (3 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('phil4-1', 'philippians', 4, 'multiple_choice', 'Que pouvons-nous faire en celui qui nous fortifie ?', NULL, NULL, NULL, 10),
('phil4-2', 'philippians', 4, 'multiple_choice', 'Comment Dieu pourvoira-t-il à nos besoins ?', NULL, NULL, NULL, 10),
('phil2-1', 'philippians', 2, 'multiple_choice', 'À quel nom tout genou fléchira-t-il ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- HEBREWS (3 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('heb11-1', 'hebrews', 11, 'multiple_choice', 'Comment Hébreux 11:1 définit-il la foi ?', NULL, NULL, NULL, 10),
('heb12-1', 'hebrews', 12, 'multiple_choice', 'Sur qui devons-nous fixer nos regards ?', NULL, NULL, NULL, 10),
('heb13-1', 'hebrews', 13, 'multiple_choice', 'Que dit Dieu sur le fait de nous délaisser ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- JAMES (3 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('jas1-1', 'james', 1, 'multiple_choice', 'Comment devons-nous considérer les épreuves selon Jacques ?', NULL, NULL, NULL, 10),
('jas1-2', 'james', 1, 'multiple_choice', 'Que devons-nous faire si nous manquons de sagesse ?', NULL, NULL, NULL, 10),
('jas2-1', 'james', 2, 'multiple_choice', 'Que dit Jacques sur la foi sans les œuvres ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- REVELATION (6 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('rev1-1', 'revelation', 1, 'multiple_choice', 'À qui Jean écrit-il l''Apocalypse ?', NULL, NULL, NULL, 10),
('rev3-1', 'revelation', 3, 'multiple_choice', 'Que dit Jésus à l''Église de Laodicée ?', NULL, NULL, NULL, 10),
('rev3-2', 'revelation', 3, 'multiple_choice', 'Que fait Jésus à la porte selon Apocalypse 3:20 ?', NULL, NULL, NULL, 10),
('rev21-1', 'revelation', 21, 'multiple_choice', 'Qu''est-ce qui descend du ciel dans Apocalypse 21 ?', NULL, NULL, NULL, 10),
('rev21-2', 'revelation', 21, 'multiple_choice', 'Qu''est-ce qui n''existera plus dans la nouvelle création ?', NULL, NULL, NULL, 10),
('rev22-1', 'revelation', 22, 'multiple_choice', 'Quelle est la dernière promesse de Jésus dans la Bible ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- EZRA (1 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('ezra1-ext1', 'ezra', 1, 'multiple_choice', 'Quel roi perse permit aux Juifs de retourner à Jérusalem ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- NEHEMIAH (4 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('neh1-ext1', 'nehemiah', 1, 'multiple_choice', 'Quel était le métier de Néhémie à la cour du roi ?', NULL, NULL, NULL, 10),
('neh2-ext1', 'nehemiah', 2, 'multiple_choice', 'Que Néhémie voulait-il reconstruire à Jérusalem ?', NULL, NULL, NULL, 10),
('neh4-ext1', 'nehemiah', 4, 'multiple_choice', 'Comment les bâtisseurs travaillaient-ils face aux menaces ?', NULL, NULL, NULL, 10),
('neh6-ext1', 'nehemiah', 6, 'multiple_choice', 'En combien de jours les murailles furent-elles reconstruites ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ESTHER (6 questions)
-- =============================================

INSERT INTO public.questions (id, book_id, chapter, question_type, question_text, verse_text, verse_reference, explanation, xp_reward) VALUES
('esther1-ext1', 'esther', 1, 'multiple_choice', 'Quel roi perse cherchait une nouvelle reine ?', NULL, NULL, NULL, 10),
('esther2-ext1', 'esther', 2, 'multiple_choice', 'Qui était le cousin et tuteur d''Esther ?', NULL, NULL, NULL, 10),
('esther3-ext1', 'esther', 3, 'multiple_choice', 'Qui complota pour exterminer tous les Juifs ?', NULL, NULL, NULL, 10),
('esther4-ext1', 'esther', 4, 'multiple_choice', 'Quelle célèbre phrase Mardochée dit-il à Esther ?', NULL, NULL, NULL, 10),
('esther7-ext1', 'esther', 7, 'multiple_choice', 'Que devint Haman à la fin ?', NULL, NULL, NULL, 10),
('esther9-ext1', 'esther', 9, 'multiple_choice', 'Quelle fête commémore la délivrance des Juifs par Esther ?', NULL, NULL, NULL, 10)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.question_options (id, question_id, option_text, is_correct, sort_order) VALUES

ON CONFLICT (id) DO NOTHING;
